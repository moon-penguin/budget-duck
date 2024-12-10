import { FastifyInstance } from 'fastify';
import { ExpensesController } from '../../../../../modules/expenses/controller/expenses.controller';
import { ExpenseSchema } from '../../../../../modules/expenses/domain/schemas/expense.schema';
import { ExpensesResponseSchema } from '../../../../../modules/expenses/domain/schemas/expensesResponse.schema';

export default async function (fastify: FastifyInstance) {
  const expensesController = new ExpensesController();

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

  fastify.get(
    '',
    {
      schema: {
        response: {
          200: ExpensesResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await expensesController.findAllExpenses(request, reply);
    }
  );

  fastify.get(
    '/:id',
    {
      schema: {
        response: {
          202: ExpenseSchema,
        },
      },
    },
    async (request, reply) => {
      return await expensesController.findExpenseById(request, reply);
    }
  );

  fastify.get(
    '/current-month',
    {
      schema: {
        response: {
          200: ExpensesResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await expensesController.findExpensesOfCurrentMonth(
        request,
        reply
      );
    }
  );

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
