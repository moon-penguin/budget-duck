import { FastifyInstance } from 'fastify';
import { BudgetSchema } from './budget.schema';
import { BudgetsResponseSchema } from './budgetsResponse.schema';
import fp from 'fastify-plugin';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(BudgetSchema);
  fastify.addSchema(BudgetsResponseSchema);
}
