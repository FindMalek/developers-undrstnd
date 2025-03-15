import fs from 'fs';
import path from 'path';

const SCHEMA_DIR = path.join(__dirname, 'prisma/schema');
const BUILD_DIR = path.join(__dirname, 'prisma/build');
const OUTPUT_FILE = path.join(BUILD_DIR, 'schema.prisma');

/**
 * This script is used to compile the schema.prisma file into a single file.
 * It is used to avoid the issue of 'prismaSchemaFolder' not being able to find the schema.prisma file.
 * This is a workaround to avoid the issue.
 */

// Ensure the build directory exists
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Read the configuration from schema.prisma
const schemaConfigPath = path.join(SCHEMA_DIR, 'schema.prisma');
const schemaConfig = fs.readFileSync(schemaConfigPath, 'utf8');

// Update the output path in the generator client
const updatedConfig = schemaConfig.replace(
    /output\s*=\s*"[^"]*"/,
    'output = "../generated/client"'
);

// Start with the generator and datasource configuration
let finalSchema = updatedConfig + '\n\n';

// Read all .prisma files except schema.prisma
const schemaFiles = fs.readdirSync(SCHEMA_DIR)
    .filter(file => file.endsWith('.prisma') && file !== 'schema.prisma');

// Concatenate all model files
for (const file of schemaFiles) {
    const filePath = path.join(SCHEMA_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    console.log(`Processing ${file}...`);
    finalSchema += `// Models from '${file}'\n`;
    finalSchema += fileContent;
    finalSchema += '\n\n';
}

// Write the combined schema to the output file
fs.writeFileSync(OUTPUT_FILE, finalSchema);

console.log(`Combined schema written to ${OUTPUT_FILE}`); 