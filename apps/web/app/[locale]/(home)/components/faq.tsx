import { PhoneCall } from "lucide-react"

import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@undrstnd/design-system/components/ui/accordion"
import { Button } from "@undrstnd/design-system/components/ui/button"
import type { Dictionary } from "@undrstnd/internationalization"

type FAQProps = {
  dictionary: Dictionary
}

export const FAQ = ({ dictionary }: FAQProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
                {dictionary.web.home.faq.title}
              </h4>
              <p className="text-muted-foreground max-w-xl text-left text-lg leading-relaxed tracking-tight lg:max-w-lg">
                {dictionary.web.home.faq.description}
              </p>
            </div>
            <div className="">
              <Button className="gap-4" variant="outline" asChild>
                <Link href="/contact">
                  {dictionary.web.home.faq.cta}{" "}
                  <PhoneCall className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {[
            ...dictionary.web.home.faq.items,
            ...dictionary.web.home.faq.items,
            ...dictionary.web.home.faq.items,
            ...dictionary.web.home.faq.items,
            ...dictionary.web.home.faq.items,
            ...dictionary.web.home.faq.items,
            ...dictionary.web.home.faq.items,
          ].map((item, index) => (
            <AccordionItem key={index} value={`index-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
)
