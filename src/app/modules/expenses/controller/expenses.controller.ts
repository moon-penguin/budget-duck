import { ExpenseRepository } from '../repository/expense.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ExpenseMapper } from '../domain/mapper/expense.mapper';
import { ExpenseDto } from '../domain/dto/expense.dto';
import { CreateExpenseDto } from '../domain/dto/create-expense.dto';
import { logError } from '../../../shared/utils/logError.utils';
import { PaginationQueryDto } from '../../../shared/schema/pagination-query.schema';

export class ExpensesController {
  private expenseRepository: ExpenseRepository;

  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  async findAll(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ExpenseDto[]> {
    try {
      const userId = request.user['id'] as string;
      const paginationQuery = request.query as PaginationQueryDto;

      const entities = await this.expenseRepository.findAll(
        userId,
        paginationQuery
      );

      reply.code(202);
      return ExpenseMapper.toDtos(entities);
    } catch (error: unknown) {
      logError(error, 'expenses controller');
      reply.internalServerError();
    }
  }

  async findById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ExpenseDto> {
    try {
      const id = Number(request.params['id']);
      const userId = request.user['id'] as string;

      const expense = await this.expenseRepository.findById(id, userId);
      if (expense) {
        reply.code(200);
        return ExpenseMapper.toDto(expense);
      } else {
        reply.notFound(`Expense with id:${id} not found.`);
      }
    } catch (error: unknown) {
      logError(error, 'expenses controller');
      reply.internalServerError();
    }
  }

  async findByCurrentMonth(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ExpenseDto[]> {
    try {
      const currentMonth = new Date(request.headers.date);
      const userId = request.user['id'] as string;

      const entities = await this.expenseRepository.findByMonth(
        currentMonth,
        userId
      );

      reply.code(202);
      return ExpenseMapper.toDtos(entities);
    } catch (error: unknown) {
      logError(error, 'expenses controller');
      reply.internalServerError();
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const expenseDto = request.body as CreateExpenseDto;
      const userId = request.user['id'] as string;

      await this.expenseRepository.create(expenseDto, userId);
      reply.code(202);
    } catch (error: unknown) {
      logError(error, 'expenses controller');
      reply.internalServerError();
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const userId = request.user['id'] as string;
      const expenseDto = request.body as ExpenseDto;

      if (id !== expenseDto.id) {
        return reply.badRequest();
      }

      const expenseToUpdate = await this.expenseRepository.findById(id, userId);

      if (!expenseToUpdate) {
        return reply.notFound(`Expense with id:${id} not found.`);
      }

      const entity = ExpenseMapper.toEntity(expenseDto, userId);
      await this.expenseRepository.update(entity);
      reply.code(202);
    } catch (error: unknown) {
      logError(error, 'expenses controller');
      reply.internalServerError();
    }
  }

  async remove(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const expenseDto = request.body as ExpenseDto;
      const userId = request.user['id'] as string;

      if (id !== expenseDto.id) {
        return reply.badRequest();
      }

      const expenseToDelete = await this.expenseRepository.findById(id, userId);

      if (!expenseToDelete) {
        return reply.notFound(`Expense with id:${id} not found.`);
      }

      const entity = ExpenseMapper.toEntity(expenseDto, userId);
      await this.expenseRepository.delete(entity);
      reply.code(202);
    } catch (error: unknown) {
      logError(error, 'expenses controller');
      reply.internalServerError();
    }
  }
}
