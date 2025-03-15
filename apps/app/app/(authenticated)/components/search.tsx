import { ArrowRightIcon, SearchIcon } from "lucide-react"

import { Button } from "@undrstnd/design-system/components/ui/button"
import { Input } from "@undrstnd/design-system/components/ui/input"

export const Search = () => (
  <form action="/search" className="flex items-center gap-2 px-4">
    <div className="relative">
      <div className="absolute bottom-px left-px top-px flex h-8 w-8 items-center justify-center">
        <SearchIcon size={16} className="text-muted-foreground" />
      </div>
      <Input
        type="text"
        name="q"
        placeholder="Search"
        className="bg-background h-auto py-1.5 pl-8 pr-3 text-xs"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-px right-px top-px h-8 w-8"
      >
        <ArrowRightIcon size={16} className="text-muted-foreground" />
      </Button>
    </div>
  </form>
)
