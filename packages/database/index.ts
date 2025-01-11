import "server-only"

import { env } from "@undrstnd/env"
import { neonConfig, Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"
import ws from "ws"

neonConfig.webSocketConstructor = ws

const pool = new Pool({ connectionString: env.DATABASE_URL })
const adapter = new PrismaNeon(pool)

export const database = new PrismaClient({ adapter })

export * from "@prisma/client"
