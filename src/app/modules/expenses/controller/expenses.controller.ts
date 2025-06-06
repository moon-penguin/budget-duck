import { ExpenseService } from '../services/expense.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ExpenseMapper } from '../domain/mapper/expense.mapper';
import { ExpenseDto } from '../domain/dto/expense.dto';
import { CreateExpenseDto } from '../domain/dto/create-expense.dto';
import { PaginationQueryDto } from '../../../shared/schema/pagination-query.schema';

export class ExpensesController {
  private expenseService: ExpenseService;

  constructor() {
    this.expenseService = new ExpenseService();
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user['id'] as string;
    const paginationQuery = request.query as PaginationQueryDto;

    const entities = await this.expenseService.findAll(userId, paginationQuery);

    reply.code(202);
    return ExpenseMapper.toDtos(entities);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const userId = request.user['id'] as string;

    const expense = await this.expenseService.findById(id, userId);

    if (expense) {
      reply.code(200);
      return ExpenseMapper.toDto(expense);
    } else {
      return reply.notFound(`Expense with id:${id} not found.`);
    }
  }

  async findByCurrentMonth(request: FastifyRequest, reply: FastifyReply) {
    const currentMonth = new Date(request.headers.date);
    const userId = request.user['id'] as string;

    const entities = await this.expenseService.findByMonth(
      currentMonth,
      userId
    );

    reply.code(202);
    return ExpenseMapper.toDtos(entities);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const expenseDto = request.body as CreateExpenseDto;
    const userId = request.user['id'] as string;

    await this.expenseService.create(expenseDto, userId);
    reply.code(202);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const userId = request.user['id'] as string;
    const expenseDto = request.body as ExpenseDto;

    if (id !== expenseDto.id) {
      reply.badRequest();
      return;
    }

    const entity = ExpenseMapper.toEntity(expenseDto, userId);
    const isUpdated = await this.expenseService.update(entity);

    if (isUpdated) {
      reply.code(202);
      return;
    } else {
      reply.notFound(`Expense not found.`);
      return;
    }
  }

  async remove(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const expenseDto = request.body as ExpenseDto;
    const userId = request.user['id'] as string;

    if (id !== expenseDto.id) {
      reply.badRequest();
      return;
    }

    const entity = ExpenseMapper.toEntity(expenseDto, userId);
    const isDeleted = await this.expenseService.delete(entity);

    if (isDeleted) {
      reply.code(202);
      return;
    } else {
      reply.notFound('Expense not found');
      return;
    }
  }
}
