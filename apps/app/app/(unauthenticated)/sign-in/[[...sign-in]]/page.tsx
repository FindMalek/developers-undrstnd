import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { createMetadata } from "@undrstnd/seo/metadata"

const title = "Welcome back"
const description = "Enter your details to sign in."
const SignIn = dynamic(() =>
  import("@undrstnd/auth/components/sign-in").then((mod) => mod.SignIn)
)

export const metadata: Metadata = createMetadata({ title, description })

const SignInPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
    <SignIn />
  </>
)

export default SignInPage
