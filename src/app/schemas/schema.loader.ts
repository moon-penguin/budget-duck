import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import * as fs from 'node:fs/promises';
import { logError } from '../utils/logError.utils';
import * as path from 'node:path';

export default fp(schemaLoader);

async function schemaLoader(fastify: FastifyInstance) {
  try {
    const pathOfSchemasDirectory = './src/app/schemas';

    await addSchemasInDirectory(pathOfSchemasDirectory, fastify.addSchema);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logError(error, 'schema loader');
    }
  }
}

async function addSchemasInDirectory(
  dirPath: string,
  addSchemaFn: (file: unknown) => void
) {
  const directoryContentsOfSchemas = await fs.readdir(dirPath);

  await Promise.allSettled(
    directoryContentsOfSchemas.map(async (content) => {
      const directoryContent = getFullPath(dirPath, content);

      if (await isDirectory(directoryContent)) {
        await addFilesOfSpecificSchema(directoryContent, addSchemaFn);
      }
    })
  );
}

async function addFilesOfSpecificSchema(
  dirPath: string,
  addSchemaFn: (file: unknown) => void
) {
  const filesOfDirectory = await fs.readdir(dirPath);
  await Promise.allSettled(
    filesOfDirectory.map(async (file) => {
      const schemaFilePath = getFullPath(dirPath, file);
      const schema = await readSchemaFile(schemaFilePath);

      addSchemaFn(schema);
    })
  );
}

async function readSchemaFile(file: string) {
  return await fs.readFile(file, { encoding: 'utf-8' });
}

async function isDirectory(path: string) {
  const stats = await fs.stat(path);
  return stats.isDirectory();
}

function getFullPath(dir: string, file: string) {
  return path.join(dir, file);
}
