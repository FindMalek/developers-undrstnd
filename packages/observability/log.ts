import { Logtail } from "@logtail/node"

import { keys } from "./keys"

const logtail = new Logtail(keys().NEXT_PUBLIC_BETTERSTACK_API_KEY, {
  endpoint: keys().NEXT_PUBLIC_BETTERSTACK_URL,
})

export const log = process.env.NODE_ENV === "production" ? logtail : console
