"use server"

import { database } from "@undrstnd/database"

export async function addWaitlist(email: string) {
  return await database.waitlist.create({
    data: {
      email,
      country: "fr",
      ipAddress: "0.",
    },
  })
}

export async function isOnWaitlist(email: string) {
  const waitlist = await database.waitlist.findUnique({
    where: {
      email,
    },
  })

  return !!waitlist
}
