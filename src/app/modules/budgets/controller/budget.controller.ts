import { BudgetRepository } from '../repository/budget.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BudgetDto } from '../domain/dto/BudgetDto';
import { BudgetMapper } from '../domain/mapper/Budget.mapper';

export class BudgetController {
  private budgetRepository: BudgetRepository;

  constructor(repository: BudgetRepository) {
    this.budgetRepository = repository;
  }

  async findAllBudgets(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<BudgetDto[]> {
    try {
      const reqUserId = request.params['userId'] as string;

      const budgetEntitys = await this.budgetRepository.findAll(reqUserId);
      const budgetDtos = budgetEntitys.map((entity) =>
        BudgetMapper.toDto(entity)
      );

      reply.statusCode = 202;
      return budgetDtos;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError(error.message);
      }
    }
  }

  async findBudgetById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<BudgetDto> {
    const id = Number(request.params['id']);
    const userId = request.params['userId'];

    try {
      const result = await this.budgetRepository.findById(id, userId);

      if (result) {
        reply.statusCode = 202;
        return BudgetMapper.toDto(result);
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
  ): Promise<BudgetDto[]> {
    try {
      const currentMonth = new Date(request.headers.date);
      const userId = request.params['userId'];

      const results = await this.budgetRepository.findByMonth(
        currentMonth,
        userId
      );
      const dtos = results.map((result) => BudgetMapper.toDto(result));

      return dtos;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async createBudget(request: FastifyRequest, reply: FastifyReply) {
    const reqBudget = request.body as BudgetDto;
    const userId = request.params['userId'];

    try {
      reply.statusCode = 201;

      const entity = BudgetMapper.toEntity(reqBudget, userId);
      await this.budgetRepository.create(entity);
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async updateBudget(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const reqBudget = request.body as BudgetDto;
    const userId = request.params['userId'];

    if (id !== reqBudget.id) {
      return reply.badRequest();
    }

    try {
      const entity = BudgetMapper.toEntity(reqBudget, userId);
      await this.budgetRepository.update(entity);
      reply.statusCode = 202;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async deleteBudget(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const reqBudget = request.body as BudgetDto;
    const userId = request.params['userId'];

    if (id !== reqBudget.id) {
      return reply.badRequest();
    }

    try {
      const entity = BudgetMapper.toEntity(reqBudget, userId);
      await this.budgetRepository.delete(entity);
      reply.statusCode = 202;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }
}
