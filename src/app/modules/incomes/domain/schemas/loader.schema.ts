import { FastifyInstance } from 'fastify';
import { IncomeSchema } from './income.schema';
import { IncomeArrayResponseSchema } from './incomeArrayResponse.schema';
import fp from 'fastify-plugin';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(IncomeSchema);
  fastify.addSchema(IncomeArrayResponseSchema);
}
