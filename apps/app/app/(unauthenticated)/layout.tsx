import { CommandIcon } from "lucide-react"

import type { ReactNode } from "react"
import Link from "next/link"

import { env } from "@/env"

import { ModeToggle } from "@undrstnd/ui"

type AuthLayoutProps = {
  readonly children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="relative z-20 flex items-center text-lg font-medium">
        <CommandIcon className="mr-2 h-6 w-6" />
        Acme Inc
      </div>
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;This library has saved me countless hours of work and helped
            me deliver stunning designs to my clients faster than ever
            before.&rdquo;
          </p>
          <footer className="text-sm">Sofia Davis</footer>
        </blockquote>
      </div>
    </div>
    <div className="lg:p-8">
      <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6">
        {children}
        <p className="text-muted-foreground px-8 text-center text-sm">
          By clicking continue, you agree to our{" "}
          <Link
            href={new URL("/legal/terms", env.NEXT_PUBLIC_WEB_URL).toString()}
            className="hover:text-primary underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={new URL("/legal/privacy", env.NEXT_PUBLIC_WEB_URL).toString()}
            className="hover:text-primary underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  </div>
)

export default AuthLayout
