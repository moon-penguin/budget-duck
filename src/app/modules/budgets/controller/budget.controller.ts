import { BudgetRepository } from '../repository/budget.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BudgetDto } from '../domain/dto/BudgetDto';
import { BudgetMapper } from '../domain/mapper/Budget.mapper';
import { UserService } from '../../users/services/user.service';

export class BudgetController {
  private budgetRepository: BudgetRepository;
  private userService: UserService;

  constructor() {
    this.budgetRepository = new BudgetRepository();
    this.userService = new UserService();
  }

  async findAllBudgets(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<BudgetDto[]> {
    try {
      const userId = request.params['userId'] as string;

      if (await this.userService.userExists(userId)) {
        const entities = await this.budgetRepository.findAll(userId);
        reply.code(202);
        return BudgetMapper.toDtos(entities);
      } else {
        reply.notFound();
      }
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
      if (await this.userService.userExists(userId)) {
        const result = await this.budgetRepository.findById(id, userId);
        if (result) {
          reply.code(200);
          return BudgetMapper.toDto(result);
        } else {
          reply.notFound();
        }
      } else {
        reply.conflict();
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

      if (await this.userService.userExists(userId)) {
        const results = await this.budgetRepository.findByMonth(
          currentMonth,
          userId
        );
        return BudgetMapper.toDtos(results);
      } else {
        reply.notFound();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async createBudget(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reqBudget = request.body as BudgetDto;
      const userId = request.params['userId'];

      if (await this.userService.userExists(userId)) {
        const entity = BudgetMapper.toEntity(reqBudget, userId);
        await this.budgetRepository.create(entity);
        reply.code(201);
      } else {
        reply.conflict();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async updateBudget(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const reqBudget = request.body as BudgetDto;
      const userId = request.params['userId'];

      if (id !== reqBudget.id) {
        return reply.badRequest();
      }

      if (await this.userService.userExists(userId)) {
        const entity = BudgetMapper.toEntity(reqBudget, userId);
        await this.budgetRepository.update(entity);
        reply.code(202);
      } else {
        reply.conflict();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async deleteBudget(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const reqBudget = request.body as BudgetDto;
      const userId = request.params['userId'];

      if (id !== reqBudget.id) {
        return reply.badRequest();
      }

      if (await this.userService.userExists(userId)) {
        const entity = BudgetMapper.toEntity(reqBudget, userId);
        await this.budgetRepository.delete(entity);
        reply.code(202);
      } else {
        reply.conflict();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }
}
