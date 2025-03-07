import type { ReactNode } from "react"
import { Toolbar } from "@repo/cms/components/toolbar"

type LegalLayoutProps = {
  children: ReactNode
}

const LegalLayout = ({ children }: LegalLayoutProps) => (
  <>
    {children}
    <Toolbar />
  </>
)

export default LegalLayout
