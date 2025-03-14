"use client"

import { Languages } from "lucide-react"

import { useParams, usePathname, useRouter } from "next/navigation"
import { Button } from "@undrstnd/design-system/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@undrstnd/design-system/components/ui/dropdown-menu"

const languages = [
  { label: "🇬🇧 English", value: "en" },
  { label: "🇪🇸 Español", value: "es" },
  { label: "🇩🇪 Deutsch", value: "de" },
]

export const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  const switchLanguage = (locale: string) => {
    // Replace the current locale in the pathname with the new one
    const newPathname = pathname.replace(`/${params.locale}`, `/${locale}`)
    router.push(newPathname)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground shrink-0"
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map(({ label, value }) => (
          <DropdownMenuItem key={value} onClick={() => switchLanguage(value)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
