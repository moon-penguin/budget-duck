import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { ExpenseRepository } from '../../../repository/expense.repository';
import { ExpensesController } from '../../../controller/expenses.controller';

export default async function (fastify: FastifyInstance) {
  const prisma = new PrismaClient();
  const expensesRepository = new ExpenseRepository(prisma);
  const expensesController = new ExpensesController(expensesRepository);

  fastify.get('', async (request, reply) => {
    return await expensesController.findAllExpenses(request, reply);
  });

  fastify.get('/:id', async (request, reply) => {
    return await expensesController.findExpenseById(request, reply);
  });

  fastify.post(
    '',
    {
      schema: {
        body: fastify.getSchema('schema:expense'),
      },
    },
    async (request, reply) => {
      return await expensesController.createExpense(request, reply);
    }
  );

  fastify.put('/:id', async (request, reply) => {
    return await expensesController.updateExpense(request, reply);
  });

  fastify.delete('/:id', async (request, reply) => {
    return await expensesController.deleteExpense(request, reply);
  });
}
