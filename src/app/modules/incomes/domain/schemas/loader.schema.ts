import { FastifyInstance } from 'fastify';
import { IncomeSchema } from './income.schema';
import { IncomeArrayResponseSchema } from './incomeArrayResponse.schema';
import fp from 'fastify-plugin';
import { CreateIncomeSchema } from './create-income.schema';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(IncomeSchema);
  fastify.addSchema(IncomeArrayResponseSchema);
  fastify.addSchema(CreateIncomeSchema);
}
