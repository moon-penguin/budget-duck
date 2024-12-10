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

  async findAllExpenses(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ExpenseDto[]> {
    try {
      const userId = request.params['userId'];

      if (await this.userService.userExists(userId)) {
        reply.statusCode = 202;
        const entities = await this.expenseRepository.findAll(userId);
        return ExpenseMapper.toDtos(entities);
      } else {
        reply.notFound();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async findExpenseById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ExpenseDto> {
    try {
      const id = Number(request.params['id']);
      const userId = request.params['userId'];

      if (await this.userService.userExists(userId)) {
        const expense = await this.expenseRepository.findById(id, userId);
        if (expense) {
          reply.statusCode = 200;
          return ExpenseMapper.toDto(expense);
        } else {
          reply.notFound();
        }
      } else {
        reply.conflict();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async findExpensesOfCurrentMonth(
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

        reply.statusCode = 202;
        return ExpenseMapper.toDtos(entities);
      } else {
        reply.conflict();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async createExpense(request: FastifyRequest, reply: FastifyReply) {
    try {
      const expenseDto = request.body as ExpenseDto;
      const userId = request.params['userId'];

      if (await this.userService.userExists(userId)) {
        const entity = ExpenseMapper.toEntity(expenseDto, userId);
        await this.expenseRepository.create(entity);
        reply.statusCode = 202;
      } else {
        reply.conflict();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError(error.message);
      }
    }
  }

  async updateExpense(request: FastifyRequest, reply: FastifyReply) {
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
        reply.statusCode = 202;
      } else {
        reply.conflict();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError();
      }
    }
  }

  async deleteExpense(request: FastifyRequest, reply: FastifyReply) {
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
        reply.statusCode = 202;
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
