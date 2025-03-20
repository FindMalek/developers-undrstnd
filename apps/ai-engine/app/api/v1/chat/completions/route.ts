import { NextRequest, NextResponse } from "next/server";
import { log } from "@undrstnd/observability/log";
import { parseError } from "@undrstnd/observability/error";
import { Readable } from "stream";
import { rateLimitRequest, addRateLimitHeaders } from "@/lib/rate-limit";
import { verifyKey } from "@/lib/auth";
import { db } from "@undrstnd/database";
import { ModelStatus } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";
import axios from "axios";

// Follows OpenAI's chat completion schema
// https://platform.openai.com/docs/api-reference/chat
export async function POST(request: NextRequest) {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();

    try {
        log.info("CHAT_COMPLETION_REQUEST", { requestId });

        // Check API key and rate limit
        const authHeader = request.headers.get("Authorization");
        if (!authHeader) {
            log.error("CHAT_COMPLETION_MISSING_API_KEY", { requestId });
            return NextResponse.json(
                { error: { message: "Missing API key", type: "authentication_error" } },
                { status: 401 }
            );
        }

        const isValidKey = await verifyKey(authHeader);
        if (!isValidKey) {
            log.error("CHAT_COMPLETION_INVALID_API_KEY", { requestId });
            return NextResponse.json(
                { error: { message: "Invalid API key", type: "authentication_error" } },
                { status: 401 }
            );
        }

        // Apply rate limiting
        const rateLimitResult = await rateLimitRequest(request);
        if (!rateLimitResult.success && rateLimitResult.response) {
            log.error("CHAT_COMPLETION_RATE_LIMIT_EXCEEDED", { requestId });
            return rateLimitResult.response;
        }

        // Parse request body
        const body = await request.json();

        // Validate required fields
        if (!body.model) {
            log.error("CHAT_COMPLETION_MISSING_MODEL", { requestId });
            return NextResponse.json(
                { error: { message: "Model is required", type: "invalid_request_error" } },
                { status: 400 }
            );
        }

        if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
            log.error("CHAT_COMPLETION_MISSING_MESSAGES", { requestId });
            return NextResponse.json(
                { error: { message: "Messages are required", type: "invalid_request_error" } },
                { status: 400 }
            );
        }

        // Find the requested model
        const models = await getAvailableModels(body.model);

        if (!models || models.length === 0) {
            log.error("CHAT_COMPLETION_MODEL_NOT_FOUND", { requestId });
            return NextResponse.json(
                { error: { message: "Model not found or currently unavailable", type: "invalid_request_error" } },
                { status: 404 }
            );
        }

        // Try to get a completion from each available provider until success
        const isStreamingRequest = body.stream === true;
        let response;
        let currentModelIndex = 0;
        let success = false;

        while (!success && currentModelIndex < models.length) {
            const model = models[currentModelIndex];
            currentModelIndex++;

            try {
                response = await getCompletionFromProvider(model, body, isStreamingRequest);
                success = true;
            } catch (error) {
                await handleModelError(model.id);

                // Last model in the list failed
                if (currentModelIndex === models.length) {
                    throw error;
                }

                // Log error and try next model
                const message = parseError(error);
                log.error("MODEL_REQUEST_FAILED", {
                    modelId: model.id,
                    providerId: model.providerId,
                    error: message,
                    requestId,
                });
            }
        }

        if (!success) {
            const message = parseError(new Error("All model providers failed"));
            log.error("CHAT_COMPLETION_ALL_MODEL_PROVIDERS_FAILED", { requestId, error: message });
            return NextResponse.json(
                { error: { message: "All model providers failed", type: "service_error" } },
                { status: 503 }
            );
        }

        // For streaming response, we directly return what the provider gave us
        if (isStreamingRequest) {
            // Make sure to add our rate limit headers
            if (rateLimitResult.remaining !== undefined) {
                const responseWithHeaders = new Response(response!.body, {
                    headers: {
                        ...Object.fromEntries(response!.headers.entries()),
                        "X-RateLimit-Limit": "1000", // Simplified for example
                        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
                        "X-RateLimit-Reset": "3600", // Simplified for example
                    },
                });

                return responseWithHeaders;
            }

            return response;
        }

        // For non-streaming, return the JSON response with added rate limit headers
        const jsonResponse = NextResponse.json(await response!.json());

        if (rateLimitResult.remaining !== undefined) {
            return addRateLimitHeaders(jsonResponse, 1000, rateLimitResult.remaining, 3600);
        }

        return jsonResponse;
    } catch (error) {
        const message = parseError(error);
        log.error("CHAT_COMPLETION_ERROR", { error: message, requestId });

        Sentry.captureException(error, {
            tags: { endpoint: "/v1/chat/completions", requestId },
        });

        return NextResponse.json(
            { error: { message: "An error occurred during your request", type: "service_error" } },
            { status: 500 }
        );
    } finally {
        const duration = Date.now() - startTime;
        log.info("CHAT_COMPLETION_COMPLETED", { requestId, duration });
    }
}

async function getAvailableModels(modelId: string) {
    try {
        // First, find the exact model if it exists
        const exactModel = await db.aIModel.findFirst({
            where: {
                externalId: modelId,
                status: ModelStatus.OPERATIONAL,
            },
            include: {
                provider: true,
            },
        });

        if (exactModel) {
            return [exactModel];
        }

        // If exact model not found, find any model with this ID across providers
        // along with its operational siblings for fallback
        const models = await db.aIModel.findMany({
            where: {
                OR: [
                    { externalId: modelId },
                    {
                        siblings: {
                            some: {
                                externalId: modelId,
                            },
                        },
                    },
                ],
                status: ModelStatus.OPERATIONAL,
            },
            include: {
                provider: true,
            },
        });

        return models;
    } catch (error) {
        const message = parseError(error);
        log.error("MODEL_LOOKUP_ERROR", { modelId, error: message });
        throw error;
    }
}

async function getCompletionFromProvider(
    model: { id: string; externalId: string; providerId: string; provider: { baseUrl: string; apiKey: string } },
    requestBody: any,
    isStreaming: boolean
) {
    try {
        // Prepare the request to the provider
        const providerRequestBody = {
            ...requestBody,
            model: model.externalId, // Use the provider's model ID
        };

        // Make the request to the provider
        const response = await axios.post(
            `${model.provider.baseUrl}/v1/chat/completions`,
            providerRequestBody,
            {
                headers: {
                    Authorization: `Bearer ${model.provider.apiKey}`,
                    "Content-Type": "application/json",
                },
                responseType: isStreaming ? "stream" : "json",
            }
        );

        // Reset error count if request succeeded
        if (model.id) {
            await db.aIModel.update({
                where: { id: model.id },
                data: {
                    errorCount: 0,
                    status: ModelStatus.OPERATIONAL,
                },
            });
        }

        if (isStreaming) {
            // For streaming, return the stream directly
            return new Response(Readable.fromWeb(response.data as any), {
                headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                },
            });
        }

        // For non-streaming, return the data
        return new Response(JSON.stringify(response.data), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        const message = parseError(error);
        log.error("PROVIDER_REQUEST_ERROR", {
            modelId: model.id,
            providerId: model.providerId,
            error: message,
        });

        throw error;
    }
}

async function handleModelError(modelId: string) {
    try {
        // Increment error count for the model
        const model = await db.aIModel.update({
            where: { id: modelId },
            data: {
                errorCount: {
                    increment: 1,
                },
            },
        });

        // If error count reaches threshold, mark as degraded
        if (model.errorCount >= 3) {
            await db.aIModel.update({
                where: { id: modelId },
                data: {
                    status: ModelStatus.DEGRADED,
                },
            });

            log.warn("MODEL_MARKED_DEGRADED", { modelId });
        }
    } catch (error) {
        const message = parseError(error);
        log.error("UPDATE_MODEL_ERROR_COUNT_FAILED", { modelId, error: message });
    }
}