import { FastifyInstance } from 'fastify';
import { ConvenientFileSysOps } from '../../../shared/utils/fileOps.utils';
import { retrieveSchema } from '../../../shared/utils/schema.utils';
import fp from 'fastify-plugin';
import { logError } from '../../../shared/utils/logError.utils';

export default fp(schemaLoader);

async function schemaLoader(fastify: FastifyInstance) {
  try {
    const schemaPath = ConvenientFileSysOps.joinPath(
      __dirname,
      'user.schema.json'
    );
    const schema = await retrieveSchema(schemaPath);

    fastify.addSchema(schema);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logError(error, 'Schema Loader Budget');
    }
  }
}
