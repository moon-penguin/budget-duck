import { IncomeService } from '../services/income.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IncomeDto } from '../domain/dto/income.dto';
import { IncomeMapper } from '../domain/mapper/Income.mapper';
import { CreateIncomeDto } from '../domain/dto/create-income.dto';
import { logError } from '../../../shared/utils/logError.utils';
import { PaginationQueryDto } from 'src/app/shared/schema/pagination-query.schema';

export class IncomeController {
  private readonly incomeService: IncomeService;

  constructor() {
    this.incomeService = new IncomeService();
  }

  async findAll(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IncomeDto[]> {
    const userId = request.user['id'] as string;
    const paginationQuery = request.query as PaginationQueryDto;

    const entities = await this.incomeService.findAll(userId, paginationQuery);
    reply.code(202);

    return IncomeMapper.toDtos(entities);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const userId = request.user['id'] as string;

    const result = await this.incomeService.findById(id, userId);
    if (result) {
      reply.code(200);
      return IncomeMapper.toDto(result);
    } else {
      reply.notFound('No Income Found');
    }
  }

  async findByCurrentMonth(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IncomeDto[]> {
    try {
      const currentMonth = new Date(request.headers.date);
      const userId = request.user['id'] as string;

      const results = await this.incomeService.findByMonth(
        currentMonth,
        userId
      );

      reply.code(200);
      return IncomeMapper.toDtos(results);
    } catch (error: unknown) {
      logError(error, 'income controller');
      reply.internalServerError();
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const reqIncome = request.body as CreateIncomeDto;
    const userId = request.user['id'] as string;

    await this.incomeService.create(reqIncome, userId);
    reply.code(201);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const reqIncome = request.body as IncomeDto;
    const userId = request.user['id'] as string;

    if (id !== reqIncome.id) {
      return reply.badRequest();
    }

    const entity = IncomeMapper.toEntity(reqIncome, userId);
    const isUpdated = await this.incomeService.update(entity);

    if (isUpdated) {
      reply.code(202);
      return;
    } else {
      reply.notFound('Income not found.');
      return;
    }
  }

  async remove(request: FastifyRequest, reply: FastifyReply) {
    const id = Number(request.params['id']);
    const reqIncome = request.body as IncomeDto;
    const userId = request.user['id'] as string;

    if (id !== reqIncome.id) {
      return reply.badRequest();
    }

    const entity = IncomeMapper.toEntity(reqIncome, userId);
    const isDeleted = await this.incomeService.delete(entity);

    if (isDeleted) {
      reply.code(202);
      return;
    } else {
      reply.notFound('Income not found.');
      return;
    }
  }
}
