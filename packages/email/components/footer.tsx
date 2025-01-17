import React from "react"
import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components"

export const baseUrl = "https://undrstnd.dev"

export function Footer() {
  return (
    <Section className="w-full">
      <Hr />

      <br />

      <Text className="font-regular text-[21px]">
        Run your business smarter.
      </Text>

      <br />

      <Section className="m-0 p-0 text-left">
        <Row>
          <Text className="font-medium">Features</Text>
        </Row>

        <Row className="mb-1.5">
          <Link
            className="text-[14px] text-[#707070]"
            href="https://go.midday.ai/bOp4NOx"
          >
            Overview
          </Link>
        </Row>
        <Row className="mb-1.5">
          <Link
            className="text-[14px] text-[#707070]"
            href="https://go.midday.ai/VFcNsmQ"
          >
            Inbox
          </Link>
        </Row>
        <Row className="mb-1.5">
          <Link
            className="text-[14px] text-[#707070]"
            href="https://go.midday.ai/uA06kWO"
          >
            Vault
          </Link>
        </Row>
        <Row className="mb-1.5">
          <Link
            className="text-[14px] text-[#707070]"
            href="https://go.midday.ai/x7Fow9L"
          >
            Tracker
          </Link>
        </Row>

        <Row className="mb-1.5">
          <Link
            className="text-[14px] text-[#707070]"
            href="https://go.midday.ai/fkYXc95"
          >
            Invoice
          </Link>
        </Row>

        <Row className="mb-1.5">
          <Link
            className="text-[14px] text-[#707070]"
            href="https://go.midday.ai/dEnP9h5"
          >
            Pricing
          </Link>
        </Row>

        <Row className="mb-1.5">
          <Link
            className="text-[14px] text-[#707070]"
            href="https://go.midday.ai/E24P3oY"
          >
            Engine
          </Link>
        </Row>

        <Row className="mb-1.5">
          <Link
            className="text-[14px] text-[#707070]"
            href="https://midday.ai/download"
          >
            Download
          </Link>
        </Row>
      </Section>

      <br />
      <br />

      <Row>
        <Column className="w-[40px] align-middle">
          <Link href="https://go.midday.ai/lS72Toq">
            <Img
              src={`${baseUrl}/email/x.png`}
              width="22"
              height="22"
              alt="Midday on X"
            />
          </Link>
        </Column>
        <Column className="w-[40px] align-middle">
          <Link href="https://go.midday.ai/7rhA3rz">
            <Img
              src={`${baseUrl}/email/producthunt.png`}
              width="22"
              height="22"
              alt="Midday on Producthunt"
            />
          </Link>
        </Column>

        <Column className="w-[40px] align-middle">
          <Link href="https://go.midday.ai/anPiuRx">
            <Img
              src={`${baseUrl}/email/discord.png`}
              width="22"
              height="22"
              alt="Midday on Discord"
            />
          </Link>
        </Column>

        <Column className="align-middle">
          <Link href="https://go.midday.ai/Ct3xybK">
            <Img
              src={`${baseUrl}/email/linkedin.png`}
              width="22"
              height="22"
              alt="Midday on LinkedIn"
            />
          </Link>
        </Column>
      </Row>

      <br />
      <br />

      <Row>
        <Text className="text-xs text-[#B8B8B8]">
          Midday Labs AB - Torsgatan 59 113 37, Stockholm, Sweden.
        </Text>
      </Row>

      <Row>
        <Link
          className="text-[14px] text-[#707070]"
          href="https://app.midday.ai/settings/notifications"
          title="Unsubscribe"
        >
          Notification preferences
        </Link>
      </Row>

      <br />
      <br />

      <Row>
        <Link href="https://go.midday.ai/FZwOHud">
          <Img
            src={`${baseUrl}/email/logo-footer.png`}
            width="100"
            alt="Midday"
            className="block"
          />
        </Link>
      </Row>
    </Section>
  )
}
