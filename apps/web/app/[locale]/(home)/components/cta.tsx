import { MoveRight, PhoneCall } from "lucide-react"

import Link from "next/link"
import { Button } from "@repo/design-system/components/ui/button"
import type { Dictionary } from "@repo/internationalization"

import { env } from "@/env"

type CTAProps = {
  dictionary: Dictionary
}

export const CTA = ({ dictionary }: CTAProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="bg-muted flex flex-col items-center gap-8 rounded-md p-4 text-center lg:p-14">
        <div className="flex flex-col gap-2">
          <h3 className="font-regular max-w-xl text-3xl tracking-tighter md:text-5xl">
            {dictionary.web.home.cta.title}
          </h3>
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed tracking-tight">
            {dictionary.web.home.cta.description}
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <Button className="gap-4" variant="outline" asChild>
            <Link href="/contact">
              {dictionary.web.global.primaryCta}{" "}
              <PhoneCall className="h-4 w-4" />
            </Link>
          </Button>
          <Button className="gap-4" asChild>
            <Link href={env.NEXT_PUBLIC_APP_URL}>
              {dictionary.web.global.secondaryCta}{" "}
              <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
)
