import { FastifyInstance } from 'fastify';
import { IncomeController } from '../../../../../modules/incomes/controller/income.controller';
import { IncomeSchema } from '../../../../../modules/incomes/domain/schemas/income.schema';
import { IncomeArrayResponseSchema } from '../../../../../modules/incomes/domain/schemas/incomeArrayResponse.schema';

export default async function (fastify: FastifyInstance) {
  const incomeController = new IncomeController();

  /*
    CREATE
   */

  fastify.post(
    '',
    {
      schema: {
        body: IncomeSchema,
      },
    },
    async (request, reply) => {
      return await incomeController.create(request, reply);
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
          200: IncomeArrayResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await incomeController.findAll(request, reply);
    }
  );

  fastify.get(
    '/:id',
    {
      schema: {
        response: {
          200: IncomeSchema,
        },
      },
    },
    async (request, reply) => {
      return await incomeController.findById(request, reply);
    }
  );

  fastify.get(
    '/current-month',
    {
      schema: {
        response: {
          200: IncomeArrayResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await incomeController.findByCurrentMonth(request, reply);
    }
  );

  /*
    UPDATE
   */

  fastify.put(
    '/:id',
    {
      schema: {
        body: IncomeSchema,
      },
    },
    async (request, reply) => {
      return await incomeController.update(request, reply);
    }
  );

  /*
    DELETE
   */

  fastify.delete(
    '/:id',
    {
      schema: {
        body: IncomeSchema,
      },
    },
    async (request, reply) => {
      return await incomeController.remove(request, reply);
    }
  );
}
