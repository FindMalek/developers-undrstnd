import "server-only"

import { neonConfig, Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import ws from "ws"

import { keys } from "./keys"
import { PrismaClient } from "./prisma/generated/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let database: PrismaClient

if (keys().NODE_ENV === "production") {
  // Production: Use Neon serverless adapter
  neonConfig.webSocketConstructor = ws
  const pool = new Pool({ connectionString: keys().DATABASE_URL })
  const adapter = new PrismaNeon(pool)

  database = globalForPrisma.prisma || new PrismaClient({ adapter })
} else {
  // Development: Use standard Prisma client
  database = globalForPrisma.prisma || new PrismaClient()
}

if (keys().NODE_ENV !== "production") {
  globalForPrisma.prisma = database
}

export { database }
export * from "./prisma/generated/client"
