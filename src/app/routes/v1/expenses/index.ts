import { FastifyInstance } from 'fastify';
import { ExpenseRepository } from '../../../modules/expenses/repository/expense.repository';
import { ExpensesController } from '../../../modules/expenses/controller/expenses.controller';
import prismaClient from '../../../shared/database/prisma';

export default async function (fastify: FastifyInstance) {
  const expensesRepository = new ExpenseRepository(prismaClient);
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
