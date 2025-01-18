import { verifyAccess, type ApiData } from "@vercel/flags"

import { NextResponse, type NextRequest } from "next/server"

import * as flags from "./index"

export const getFlags = async (request: NextRequest) => {
  const access = await verifyAccess(request.headers.get("Authorization"))

  if (!access) {
    return NextResponse.json(null, { status: 401 })
  }

  const definitions = Object.fromEntries(
    Object.values(flags).map((flag) => [
      flag.key,
      {
        origin: flag.origin,
        description: flag.description,
        options: flag.options,
      },
    ])
  )

  return NextResponse.json<ApiData>({
    definitions,
  })
}
