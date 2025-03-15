Object.defineProperty(exports, "__esModule", { value: true })

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require("./runtime/wasm.js")

const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d",
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
}

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable",
})

exports.Prisma.WaitlistScalarFieldEnum = {
  id: "id",
  email: "email",
  country: "country",
  city: "city",
  ip: "ip",
  joinedAt: "joinedAt",
  createdAt: "createdAt",
}

exports.Prisma.PageScalarFieldEnum = {
  id: "id",
  name: "name",
}

exports.Prisma.SortOrder = {
  asc: "asc",
  desc: "desc",
}

exports.Prisma.QueryMode = {
  default: "default",
  insensitive: "insensitive",
}

exports.Prisma.NullsOrder = {
  first: "first",
  last: "last",
}

exports.Prisma.ModelName = {
  Waitlist: "Waitlist",
  Page: "Page",
}
/**
 * Create the Client
 */
const config = {
  generator: {
    name: "client",
    provider: {
      fromEnvVar: null,
      value: "prisma-client-js",
    },
    output: {
      value:
        "/home/malek/projects/undrstnd-developers/packages/database/generated/client",
      fromEnvVar: null,
    },
    config: {
      engineType: "library",
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: "debian-openssl-3.0.x",
        native: true,
      },
    ],
    previewFeatures: ["driverAdapters"],
    sourceFilePath:
      "/home/malek/projects/undrstnd-developers/packages/database/prisma/schema.prisma",
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: null,
    schemaEnvPath: "../../.env",
  },
  relativePath: "../../prisma",
  clientVersion: "6.4.1",
  engineVersion: "a9055b89e58b4b5bfb59600785423b1db3d0e75d",
  datasourceNames: ["db"],
  activeProvider: "postgresql",
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: "DATABASE_URL",
        value: null,
      },
    },
  },
  inlineSchema:
    '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["driverAdapters"]\n  output          = "../generated/client"\n}\n\ndatasource db {\n  provider     = "postgresql"\n  url          = env("DATABASE_URL")\n  relationMode = "prisma"\n}\n\n/**\n * Represents a waitlist.\n * @property id - Unique identifier for the waitlist entry. Type: String. Generated using cuid().\n * @property email - Email address of the user. Type: String. Must be unique.\n * @property country - Country of the user. Type: String. Optional.\n * @property city - City of the user. Type: String. Optional.\n * @property ip - IP address of the user. Type: String. Optional.\n * @property joinedAt - Timestamp when the user joined the waitlist. Type: DateTime. Optional.\n * @property createdAt - Timestamp when the waitlist entry was created. Type: DateTime. Defaults to current time.\n */\nmodel Waitlist {\n  id    String @id @default(cuid())\n  email String @unique\n\n  country  String?\n  city     String?\n  ip       String?\n  joinedAt DateTime?\n\n  createdAt DateTime @default(now())\n\n  @@map("waitlist")\n}\n\n// This is a stub model.\n// Delete it and add your own Prisma models.\nmodel Page {\n  id   Int    @id @default(autoincrement())\n  name String\n}\n',
  inlineSchemaHash:
    "1d43637d7023892eb3f9084b7967790abd80abc766e034147cd3073faa550b6a",
  copyEngine: true,
}
config.dirname = "/"

config.runtimeDataModel = JSON.parse(
  '{"models":{"Waitlist":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"ip","kind":"scalar","type":"String"},{"name":"joinedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"waitlist"},"Page":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"name","kind":"scalar","type":"String"}],"dbName":null}},"enums":{},"types":{}}'
)
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require("./query_engine_bg.js"),
  getQueryEngineWasmModule: async () => {
    const loader = (await import("#wasm-engine-loader")).default
    const engine = (await loader).default
    return engine
  },
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL:
      (typeof globalThis !== "undefined" && globalThis["DATABASE_URL"]) ||
      (typeof process !== "undefined" &&
        process.env &&
        process.env.DATABASE_URL) ||
      undefined,
  },
})

if (
  (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
  (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
  undefined
) {
  Debug.enable(
    (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
      (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
      undefined
  )
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)
