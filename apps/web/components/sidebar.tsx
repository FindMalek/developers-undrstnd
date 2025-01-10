import type { ReactNode } from "react"
import { capitalize } from "@undrstnd/ui/lib/utils"

type SidebarProperties = {
  readonly date: Date
  readonly readingTime: string
  readonly tags?: string[]
  readonly toc?: ReactNode
}

export const Sidebar = async ({
  date,
  readingTime,
  tags,
  toc: Toc,
}: SidebarProperties) => (
  <div className="border-foreground/10 col-span-4 flex w-72 flex-col items-start gap-8 border-l px-6 lg:col-span-2">
    <div className="grid gap-2">
      <p className="text-muted-foreground text-sm">Published</p>
      <p className="text-foreground rounded-sm text-sm">
        {new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "America/New_York",
        }).format(date)}
      </p>
    </div>
    <div className="grid gap-2">
      <p className="text-muted-foreground text-sm">Reading Time</p>
      <p className="text-foreground rounded-sm text-sm">{readingTime}</p>
    </div>
    {tags && (
      <div className="grid gap-2">
        <p className="text-muted-foreground text-sm">Tags</p>
        <p className="text-foreground rounded-sm text-sm">
          {tags.map(capitalize).join(", ")}
        </p>
      </div>
    )}
    {Toc ? (
      <div className="-mx-2">
        <div className="grid gap-2 p-2">
          <p className="text-muted-foreground text-sm">Sections</p>
          {Toc}
        </div>
      </div>
    ) : undefined}
  </div>
)
