import type { ReactNode } from "react"
import { Toolbar } from "@undrstnd/cms/components/toolbar"

type BlogLayoutProps = {
  children: ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => (
  <>
    {children}
    <Toolbar />
  </>
)

export default BlogLayout
