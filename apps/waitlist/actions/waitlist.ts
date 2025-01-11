"use server"

import { database } from "@undrstnd/database"

export async function addWaitlist(email: string) {
  console.log("Adding email to waitlist", email)
  const x = await database.waitlist.create({
    data: {
      email,
      country: "fr",
      ipAddress: "0.",
    },
  })
  console.log("Added email to waitlist", x)
}

export async function isOnWaitlist(email: string) {
  const waitlist = await database.waitlist.findUnique({
    where: {
      email,
    },
  })

  return !!waitlist
}
