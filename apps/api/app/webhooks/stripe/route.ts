import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { analytics } from "@undrstnd/analytics/posthog/server"
import { clerkClient } from "@undrstnd/auth/server"
import { parseError } from "@undrstnd/observability/error"
import { log } from "@undrstnd/observability/log"
import { stripe } from "@undrstnd/payments"
import type { Stripe } from "@undrstnd/payments"

import { env } from "@/env"

const getUserFromCustomerId = async (customerId: string) => {
  const clerk = await clerkClient()
  const users = await clerk.users.getUserList()

  const user = users.data.find(
    (user) => user.privateMetadata.stripeCustomerId === customerId
  )

  return user
}

const handleCheckoutSessionCompleted = async (
  data: Stripe.Checkout.Session
) => {
  if (!data.customer) {
    return
  }

  const customerId =
    typeof data.customer === "string" ? data.customer : data.customer.id
  const user = await getUserFromCustomerId(customerId)

  if (!user) {
    return
  }

  analytics.capture({
    event: "User Subscribed",
    distinctId: user.id,
  })
}

const handleSubscriptionScheduleCanceled = async (
  data: Stripe.SubscriptionSchedule
) => {
  if (!data.customer) {
    return
  }

  const customerId =
    typeof data.customer === "string" ? data.customer : data.customer.id
  const user = await getUserFromCustomerId(customerId)

  if (!user) {
    return
  }

  analytics.capture({
    event: "User Unsubscribed",
    distinctId: user.id,
  })
}

export const POST = async (request: Request): Promise<Response> => {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Not configured", ok: false })
  }

  try {
    const body = await request.text()
    const headerPayload = await headers()
    const signature = headerPayload.get("stripe-signature")

    if (!signature) {
      throw new Error("missing stripe-signature header")
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )

    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutSessionCompleted(event.data.object)
        break
      }
      case "subscription_schedule.canceled": {
        await handleSubscriptionScheduleCanceled(event.data.object)
        break
      }
      default: {
        log.info(`Unhandled event type ${event.type}`)
      }
    }

    await analytics.shutdown()

    return NextResponse.json({ result: event, ok: true })
  } catch (error) {
    const message = parseError(error)

    log.info(message)

    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    )
  }
}
