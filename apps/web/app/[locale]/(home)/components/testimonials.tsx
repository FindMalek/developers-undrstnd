"use client"

import { User } from "lucide-react"

import { useEffect, useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@undrstnd/design-system/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@undrstnd/design-system/components/ui/carousel"
import type { Dictionary } from "@undrstnd/internationalization"

type TestimonialsProps = {
  dictionary: Dictionary
}

export const Testimonials = ({ dictionary }: TestimonialsProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0)
        api.scrollTo(0)
      } else {
        api.scrollNext()
        setCurrent(current + 1)
      }
    }, 4000)
  }, [api, current])

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="font-regular text-left text-3xl tracking-tighter md:text-5xl lg:max-w-xl">
            {dictionary.web.home.testimonials.title}
          </h2>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {[
                ...dictionary.web.home.testimonials.items,
                ...dictionary.web.home.testimonials.items,
                ...dictionary.web.home.testimonials.items,
                ...dictionary.web.home.testimonials.items,
                ...dictionary.web.home.testimonials.items,
                ...dictionary.web.home.testimonials.items,
                ...dictionary.web.home.testimonials.items,
              ].map((item, index) => (
                <CarouselItem className="lg:basis-1/2" key={index}>
                  <div className="bg-muted flex aspect-video h-full flex-col justify-between rounded-md p-6 lg:col-span-2">
                    <User className="h-8 w-8 stroke-1" />
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <h3 className="text-xl tracking-tight">{item.title}</h3>
                        <p className="text-muted-foreground max-w-xs text-base">
                          {item.description}
                        </p>
                      </div>
                      <p className="flex flex-row items-center gap-2 text-sm">
                        <span className="text-muted-foreground">By</span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.author.image} />
                          <AvatarFallback>??</AvatarFallback>
                        </Avatar>
                        <span>{item.author.name}</span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
