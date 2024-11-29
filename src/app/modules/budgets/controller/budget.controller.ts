import { BudgetRepository } from '../repository/budget.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Budget } from '@prisma/client';

export class BudgetController {
  private budgetRepository: BudgetRepository;

  constructor(repository: BudgetRepository) {
    this.budgetRepository = repository;
  }

  async findAllBudgets(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Budget[]> {
    try {
      reply.statusCode = 202;
      return await this.budgetRepository.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError(error.message);
      }
    }
  }

  async findBudgetById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Budget> {
    const id = Number(request.params['id']);

    try {
      const result = await this.budgetRepository.findById(id);

      if (result) {
        reply.statusCode = 202;
        return result;
      } else {
        reply.notFound();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError(error.message);
      }
    }
  }

  async findBudgetsOfCurrentMonth(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<Budget[]> {
    try {
      const currentMonth = new Date(request.headers.date);
      return await this.budgetRepository.findByMonth(currentMonth);
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async createBudget(request: FastifyRequest, reply: FastifyReply) {
    const reqBudget = request.body as Budget;

    try {
      reply.statusCode = 201;
      await this.budgetRepository.create(reqBudget);
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async updateBudget(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const reqBudget = request.body as Budget;

    if (id !== reqBudget.id) {
      return reply.badRequest();
    }

    try {
      await this.budgetRepository.update(reqBudget);
      reply.statusCode = 202;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async deleteBudget(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const reqBudget = request.body as Budget;

    if (id !== reqBudget.id) {
      return reply.badRequest();
    }

    try {
      await this.budgetRepository.delete(reqBudget);
      reply.statusCode = 202;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }
}
