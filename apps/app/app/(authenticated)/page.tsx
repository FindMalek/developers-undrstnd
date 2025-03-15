import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { auth } from "@undrstnd/auth/server"
import { database } from "@undrstnd/database"

import { env } from "@/env"

import { AvatarStack } from "./components/avatar-stack"
import { Cursors } from "./components/cursors"
import { Header } from "./components/header"

const title = "Acme Inc"
const description = "My application."

const CollaborationProvider = dynamic(() =>
  import("./components/collaboration-provider").then(
    (mod) => mod.CollaborationProvider
  )
)

export const metadata: Metadata = {
  title,
  description,
}

const App = async () => {
  const pages = await database.page.findMany()
  const { orgId } = await auth()

  if (!orgId) {
    notFound()
  }

  return (
    <>
      <Header pages={["Building Your Application"]} page="Data Fetching">
        {env.LIVEBLOCKS_SECRET && (
          <CollaborationProvider orgId={orgId}>
            <AvatarStack />
            <Cursors />
          </CollaborationProvider>
        )}
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {pages.map((page) => (
            <div key={page.id} className="bg-muted/50 aspect-video rounded-xl">
              {page.name}
            </div>
          ))}
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </>
  )
}

export default App
