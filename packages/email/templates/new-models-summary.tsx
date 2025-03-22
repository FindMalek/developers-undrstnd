import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface ModelDiscoveryItem {
  modelName: string
  providerName: string
  parameters?: string
  discoveredAt: string
}

interface NewModelsSummaryProps {
  models: ModelDiscoveryItem[]
  weekStartDate: string
  weekEndDate: string
}

export const NewModelsSummary = ({
  models,
  weekStartDate,
  weekEndDate,
}: NewModelsSummaryProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>
        {models.length > 0
          ? `${models.length} new AI models discovered this week!`
          : "Weekly AI model report"}
      </Preview>
      <Body className="bg-zinc-50 font-sans">
        <Container className="mx-auto py-12">
          <Section className="mb-8 text-center">
            <Img
              src="https://undrstnd.dev/logo.png"
              width="64"
              height="64"
              alt="Undrstnd Developers"
              className="mx-auto mb-4"
            />
            <Heading className="m-0 text-2xl font-bold text-zinc-900">
              AI Model Discovery Report
            </Heading>
            <Text className="m-0 text-zinc-600">
              {weekStartDate} - {weekEndDate}
            </Text>
          </Section>

          {models.length > 0 ? (
            <>
              <Section className="mb-8 text-center">
                <Text className="m-0 text-xl text-zinc-800">
                  {models.length} new AI{" "}
                  {models.length === 1 ? "model" : "models"} discovered this
                  week!
                </Text>
              </Section>

              <Section className="rounded-md bg-zinc-200 p-px">
                <Section className="rounded-[5px] bg-white p-8">
                  {models.map((model, index) => (
                    <Section key={index} className="mb-4">
                      <Text className="m-0 text-lg font-medium text-zinc-900">
                        {model.modelName}
                      </Text>
                      <Text className="m-0 text-sm text-zinc-600">
                        Provider: {model.providerName}
                        {model.parameters
                          ? ` • ${model.parameters} parameters`
                          : ""}
                      </Text>
                      <Text className="m-0 text-xs text-zinc-500">
                        Discovered on {model.discoveredAt}
                      </Text>
                      {index < models.length - 1 && <Hr className="my-4" />}
                    </Section>
                  ))}
                </Section>
              </Section>
            </>
          ) : (
            <Section className="rounded-md bg-zinc-200 p-px">
              <Section className="rounded-[5px] bg-white p-8 text-center">
                <Text className="m-0 text-lg text-zinc-800">
                  No new models were discovered this week.
                </Text>
                <Text className="m-0 mt-2 text-sm text-zinc-600">
                  We'll keep you updated on any new AI models as they become
                  available.
                </Text>
              </Section>
            </Section>
          )}

          <Section className="mt-8 text-center">
            <Text className="m-0 text-sm text-zinc-600">
              This is an automated message from Undrstnd Developers.
            </Text>
            <Text className="m-0 text-sm text-zinc-600">
              <Link
                href="https://undrstnd.dev"
                className="text-blue-600 underline"
              >
                Visit our website
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)
