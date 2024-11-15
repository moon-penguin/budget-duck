import { FastifyInstance } from 'fastify';
import { BudgetRepository } from '../../../repository/budget.repository';
import { BudgetController } from '../../../controller/budget.controller';

export default async function (fastify: FastifyInstance) {
  const budgetRepository = new BudgetRepository(fastify['prisma']);
  const budgetController = new BudgetController(budgetRepository);

  fastify.get('', async (request, reply) => {
    return await budgetController.getAll(request, reply);
  });

  fastify.get('/:id', async (request, reply) => {
    return await budgetController.getById(request, reply);
  });

  fastify.post(
    '',
    {
      schema: {
        body: fastify.getSchema('schema:budget'),
      },
    },
    async (request, reply) => {
      return await budgetController.create(request, reply);
    }
  );

  fastify.put('/:id', async (request, reply) => {
    return await budgetController.update(request, reply);
  });

  fastify.delete(
    '/:id',
    {
      schema: {
        body: fastify.getSchema('schema:budget'),
      },
    },
    async (request, reply) => {
      return await budgetController.delete(request, reply);
    }
  );
}
