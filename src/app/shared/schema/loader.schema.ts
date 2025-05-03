import { FastifyInstance } from 'fastify';
import { PaginationQuerySchema } from './pagination-query.schema';
import fp from 'fastify-plugin';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(PaginationQuerySchema);
}
