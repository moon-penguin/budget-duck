import { FastifyInstance } from 'fastify';
import { ExpenseSchema } from './expense.schema';
import fp from 'fastify-plugin';
import { ExpensesResponseSchema } from './expensesResponse.schema';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(ExpenseSchema);
  fastify.addSchema(ExpensesResponseSchema);
}
