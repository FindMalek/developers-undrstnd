import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { createMetadata } from "@repo/seo/metadata"

const title = "Create an account"
const description = "Enter your details to get started."
const SignUp = dynamic(() =>
  import("@repo/auth/components/sign-up").then((mod) => mod.SignUp)
)

export const metadata: Metadata = createMetadata({ title, description })

const SignUpPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
    <SignUp />
  </>
)

export default SignUpPage
