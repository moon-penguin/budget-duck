import { IncomeRepository } from '../repository/income.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IncomeDto } from '../domain/dto/IncomeDto';
import { IncomeMapper } from '../domain/mapper/Income.mapper';
import { UserService } from '../../users/services/user.service';

export class IncomeController {
  private incomeRepository: IncomeRepository;
  private userService: UserService;

  constructor() {
    this.incomeRepository = new IncomeRepository();
    this.userService = new UserService();
  }

  async findAll(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IncomeDto[]> {
    try {
      const userId = request.params['userId'] as string;

      if (await this.userService.verifyUserById(userId)) {
        const entities = await this.incomeRepository.findAll(userId);
        reply.code(202);
        return IncomeMapper.toDtos(entities);
      } else {
        reply.notFound(`User with id:${userId} not found`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError(error.message);
      }
    }
  }

  async findById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IncomeDto> {
    try {
      const id = Number(request.params['id']);
      const userId = request.params['userId'];

      if (await this.userService.verifyUserById(userId)) {
        const result = await this.incomeRepository.findById(id, userId);
        if (result) {
          reply.code(200);
          return IncomeMapper.toDto(result);
        } else {
          reply.notFound('No Income Found');
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError(error.message);
      }
    }
  }

  async findByCurrentMonth(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IncomeDto[]> {
    try {
      const currentMonth = new Date(request.headers.date);
      const userId = request.params['userId'];

      if (await this.userService.verifyUserById(userId)) {
        const results = await this.incomeRepository.findByMonth(
          currentMonth,
          userId
        );
        reply.code(200);
        return IncomeMapper.toDtos(results);
      } else {
        reply.notFound();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reqBudget = request.body as IncomeDto;
      const userId = request.params['userId'];

      if (await this.userService.verifyUserById(userId)) {
        const entity = IncomeMapper.toEntity(reqBudget, userId);
        await this.incomeRepository.create(entity);
        reply.code(201);
      } else {
        reply.notFound(`User with id:${userId} not found.`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError(error.message);
      }
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const reqBudget = request.body as IncomeDto;
      const userId = request.params['userId'];

      if (id !== reqBudget.id) {
        return reply.badRequest();
      }

      if (await this.userService.verifyUserById(userId)) {
        const entity = IncomeMapper.toEntity(reqBudget, userId);
        await this.incomeRepository.update(entity);
        reply.code(202);
      } else {
        reply.notFound(`User with id:${userId} not found.`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async remove(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const reqBudget = request.body as IncomeDto;
      const userId = request.params['userId'];

      if (id !== reqBudget.id) {
        return reply.badRequest();
      }

      if (await this.userService.verifyUserById(userId)) {
        const entity = IncomeMapper.toEntity(reqBudget, userId);
        await this.incomeRepository.delete(entity);
        reply.code(202);
      } else {
        reply.notFound(`User with id:${userId} not found.`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }
}
