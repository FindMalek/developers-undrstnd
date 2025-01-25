import { Logger } from "@logtail/next"

import { keys } from "./keys"

const logger = new Logger({
  token: keys().NEXT_PUBLIC_BETTERSTACK_API_KEY,
})

export const log = process.env.NODE_ENV === "production" ? logger : console
