import { FastifyInstance } from 'fastify';
import { ExpenseRepository } from '../../../modules/expenses/repository/expense.repository';
import { ExpensesController } from '../../../modules/expenses/controller/expenses.controller';
import prismaClient from '../../../shared/database/prisma';
import { ExpenseSchema } from '../../../modules/expenses/domain/schemas/ExpenseSchema';

export default async function (fastify: FastifyInstance) {
  const expensesRepository = new ExpenseRepository(prismaClient);
  const expensesController = new ExpensesController(expensesRepository);

  /*
    CREATE
   */

  fastify.post(
    '',
    {
      schema: {
        body: ExpenseSchema,
      },
    },
    async (request, reply) => {
      return await expensesController.createExpense(request, reply);
    }
  );

  /*
    READ
   */

  fastify.get('', async (request, reply) => {
    return await expensesController.findAllExpenses(request, reply);
  });

  fastify.get('/:id', async (request, reply) => {
    return await expensesController.findExpenseById(request, reply);
  });

  fastify.get('/current-month', async (request, reply) => {
    return await expensesController.findExpensesOfCurrentMonth(request, reply);
  });

  /*
    UPDATE
   */

  fastify.put(
    '/:id',
    {
      schema: {
        body: ExpenseSchema,
      },
    },
    async (request, reply) => {
      return await expensesController.updateExpense(request, reply);
    }
  );

  /*
    DELETE
   */

  fastify.delete(
    '/:id',
    {
      schema: {
        body: ExpenseSchema,
      },
    },
    async (request, reply) => {
      return await expensesController.deleteExpense(request, reply);
    }
  );
}
