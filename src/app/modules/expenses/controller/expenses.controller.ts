import { ExpenseRepository } from '../repository/expense.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../../users/services/user.service';
import { ExpenseMapper } from '../domain/mapper/expense.mapper';
import { ExpenseDto } from '../domain/dto/ExpenseDto';

export class ExpensesController {
  private expenseRepository: ExpenseRepository;
  private userService: UserService;

  constructor() {
    this.expenseRepository = new ExpenseRepository();
    this.userService = new UserService();
  }

  async findAll(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ExpenseDto[]> {
    try {
      const userId = request.params['userId'];

      if (await this.userService.userExists(userId)) {
        const entities = await this.expenseRepository.findAll(userId);
        reply.code(202);
        return ExpenseMapper.toDtos(entities);
      } else {
        reply.notFound(`User with id:${userId} not found.`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async findById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ExpenseDto> {
    try {
      const id = Number(request.params['id']);
      const userId = request.params['userId'];

      if (await this.userService.userExists(userId)) {
        const expense = await this.expenseRepository.findById(id, userId);
        if (expense) {
          reply.code(200);
          return ExpenseMapper.toDto(expense);
        } else {
          reply.notFound(`Expense with id:${id} not found.`);
        }
      } else {
        reply.notFound(`User with id:${userId} not found.`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async findByCurrentMonth(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ExpenseDto[]> {
    try {
      const currentMonth = new Date(request.headers.date);
      const userId = request.params['userId'];

      if (await this.userService.userExists(userId)) {
        const entities = await this.expenseRepository.findByMonth(
          currentMonth,
          userId
        );

        reply.code(202);
        return ExpenseMapper.toDtos(entities);
      } else {
        reply.notFound(`User with id:${userId} not found.`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const expenseDto = request.body as ExpenseDto;
      const userId = request.params['userId'];

      if (await this.userService.userExists(userId)) {
        const entity = ExpenseMapper.toEntity(expenseDto, userId);
        await this.expenseRepository.create(entity);
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

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const userId = request.params['userId'];
      const expenseDto = request.body as ExpenseDto;

      if (id !== expenseDto.id) {
        return reply.badRequest();
      }

      if (await this.userService.userExists(userId)) {
        const entity = ExpenseMapper.toEntity(expenseDto, userId);
        await this.expenseRepository.update(entity);
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
      const expenseDto = request.body as ExpenseDto;
      const userId = request.params['userId'];

      if (id !== expenseDto.id) {
        return reply.badRequest();
      }

      if (await this.userService.userExists(userId)) {
        const entity = ExpenseMapper.toEntity(expenseDto, userId);
        await this.expenseRepository.delete(entity);
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
