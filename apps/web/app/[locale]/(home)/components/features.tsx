import { User } from "lucide-react"

import type { Dictionary } from "@undrstnd/internationalization"

type FeaturesProps = {
  dictionary: Dictionary
}

export const Features = ({ dictionary }: FeaturesProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
              {dictionary.web.home.features.title}
            </h2>
            <p className="text-muted-foreground max-w-xl text-left text-lg leading-relaxed tracking-tight lg:max-w-lg">
              {dictionary.web.home.features.description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-muted flex aspect-square h-full flex-col justify-between rounded-md p-6 lg:col-span-2 lg:aspect-auto">
            <User className="h-8 w-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">
                {dictionary.web.home.features.items[0].title}
              </h3>
              <p className="text-muted-foreground max-w-xs text-base">
                {dictionary.web.home.features.items[0].description}
              </p>
            </div>
          </div>
          <div className="bg-muted flex aspect-square flex-col justify-between rounded-md p-6">
            <User className="h-8 w-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">
                {dictionary.web.home.features.items[0].title}
              </h3>
              <p className="text-muted-foreground max-w-xs text-base">
                {dictionary.web.home.features.items[0].description}
              </p>
            </div>
          </div>

          <div className="bg-muted flex aspect-square flex-col justify-between rounded-md p-6">
            <User className="h-8 w-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">
                {dictionary.web.home.features.items[0].title}
              </h3>
              <p className="text-muted-foreground max-w-xs text-base">
                {dictionary.web.home.features.items[0].description}
              </p>
            </div>
          </div>
          <div className="bg-muted flex aspect-square h-full flex-col justify-between rounded-md p-6 lg:col-span-2 lg:aspect-auto">
            <User className="h-8 w-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">
                {dictionary.web.home.features.items[0].title}
              </h3>
              <p className="text-muted-foreground max-w-xs text-base">
                {dictionary.web.home.features.items[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
