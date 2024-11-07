import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { BudgetRepository } from '../../../repository/budget.repository';
import { BudgetController } from '../../../controller/budget.controller';

export default async function (fastify: FastifyInstance) {
  const prisma = new PrismaClient();
  const budgetRepository = new BudgetRepository(prisma);
  const budgetController = new BudgetController(budgetRepository);

  fastify.get('', async (request, reply) => {
    return await budgetController.getAll(request, reply);
  });

  fastify.get('/:id', async (request, reply) => {
    return await budgetController.getById(request, reply);
  });

  fastify.post('', async (request, reply) => {
    return await budgetController.create(request, reply);
  });

  fastify.put('', async (request, reply) => {
    return await budgetController.update(request, reply);
  });
}
