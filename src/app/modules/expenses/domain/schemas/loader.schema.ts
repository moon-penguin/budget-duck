import { FastifyInstance } from 'fastify';
import { ExpenseSchema } from './ExpenseSchema';
import fp from 'fastify-plugin';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(ExpenseSchema);
}
