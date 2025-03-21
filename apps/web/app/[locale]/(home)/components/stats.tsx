import { MoveDownLeft, MoveUpRight } from "lucide-react"

import type { Dictionary } from "@undrstnd/internationalization"

type StatsProps = {
  dictionary: Dictionary
}

export const Stats = ({ dictionary }: StatsProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-regular text-left text-xl tracking-tighter md:text-5xl lg:max-w-xl">
              {dictionary.web.home.stats.title}
            </h2>
            <p className="text-muted-foreground text-left text-lg leading-relaxed tracking-tight lg:max-w-sm">
              {dictionary.web.home.stats.description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-2 lg:grid-cols-2">
            {dictionary.web.home.stats.items.map((item, index) => {
              const delta = Math.random() * 100
              const metric = Math.random() * 1000000

              return (
                <div
                  className="flex flex-col justify-between gap-0 rounded-md border p-6"
                  key={index}
                >
                  {delta > 0 ? (
                    <MoveUpRight className="text-primary mb-10 h-4 w-4" />
                  ) : (
                    <MoveDownLeft className="text-destructive mb-10 h-4 w-4" />
                  )}
                  <h2 className="font-regular flex max-w-xl flex-row items-end gap-4 text-left text-4xl tracking-tighter">
                    {new Intl.NumberFormat().format(metric)}
                    <span className="text-muted-foreground text-sm tracking-normal">
                      {delta > 0 ? "+" : ""}
                      {delta}%
                    </span>
                  </h2>
                  <p className="text-muted-foreground max-w-xl text-left text-base leading-relaxed tracking-tight">
                    {item}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
)
