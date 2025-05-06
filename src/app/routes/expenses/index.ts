import { FastifyInstance } from 'fastify';
import { ExpensesController } from '../../modules/expenses/controller/expenses.controller';
import { ExpenseSchema } from '../../modules/expenses/domain/schemas/expense.schema';
import { ExpensesResponseSchema } from '../../modules/expenses/domain/schemas/expensesResponse.schema';
import { CreateExpenseSchema } from '../../modules/expenses/domain/schemas/create-expense.schema';
import { PaginationQuerySchema } from '../../shared/schema/pagination-query.schema';

export default async function (fastify: FastifyInstance) {
  fastify.addHook('onRequest', fastify.authenticate);
  const expensesController = new ExpensesController();

  /*
    CREATE
   */

  fastify.post(
    '',
    {
      schema: {
        body: CreateExpenseSchema,
      },
    },
    async (request, reply) => {
      return await expensesController.create(request, reply);
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
        querystring: PaginationQuerySchema,
      },
    },
    async (request, reply) => {
      return await expensesController.findAll(request, reply);
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
      return await expensesController.findById(request, reply);
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
      return await expensesController.findByCurrentMonth(request, reply);
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
      return await expensesController.update(request, reply);
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
      return await expensesController.remove(request, reply);
    }
  );
}
