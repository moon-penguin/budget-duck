import { FastifyInstance } from 'fastify';
import { BudgetRepository } from '../../../../../modules/budgets/repository/budget.repository';
import { BudgetController } from '../../../../../modules/budgets/controller/budget.controller';
import prismaClient from '../../../../../shared/database/prisma';
import { BudgetSchema } from '../../../../../modules/budgets/domain/schemas/budget.schema';
import { BudgetsResponseSchema } from '../../../../../modules/budgets/domain/schemas/budgetsResponse.schema';

export default async function (fastify: FastifyInstance) {
  const budgetRepository = new BudgetRepository(prismaClient);
  const budgetController = new BudgetController(budgetRepository);

  /*
    CREATE
   */

  fastify.post(
    '',
    {
      schema: {
        body: BudgetSchema,
      },
    },
    async (request, reply) => {
      return await budgetController.createBudget(request, reply);
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
          200: BudgetsResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await budgetController.findAllBudgets(request, reply);
    }
  );

  fastify.get(
    '/:id',
    {
      schema: {
        response: {
          200: BudgetSchema,
        },
      },
    },
    async (request, reply) => {
      return await budgetController.findBudgetById(request, reply);
    }
  );

  fastify.get(
    '/current-month',
    {
      schema: {
        response: {
          200: BudgetsResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await budgetController.findBudgetsOfCurrentMonth(request, reply);
    }
  );

  /*
    UPDATE
   */

  fastify.put(
    '/:id',
    {
      schema: {
        body: BudgetSchema,
      },
    },
    async (request, reply) => {
      return await budgetController.updateBudget(request, reply);
    }
  );

  /*
    DELETE
   */

  fastify.delete(
    '/:id',
    {
      schema: {
        body: BudgetSchema,
      },
    },
    async (request, reply) => {
      return await budgetController.deleteBudget(request, reply);
    }
  );
}
