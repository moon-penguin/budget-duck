import { IncomeRepository } from '../repository/income.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IncomeDto } from '../domain/dto/income.dto';
import { IncomeMapper } from '../domain/mapper/Income.mapper';
import { CreateIncomeDto } from '../domain/dto/create-income.dto';
import { logError } from '../../../shared/utils/logError.utils';

export class IncomeController {
  private incomeRepository: IncomeRepository;

  constructor() {
    this.incomeRepository = new IncomeRepository();
  }

  async findAll(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IncomeDto[]> {
    try {
      const userId = request.user['id'] as string;

      const entities = await this.incomeRepository.findAll(userId);
      reply.code(202);

      return IncomeMapper.toDtos(entities);
    } catch (error: unknown) {
      logError(error, 'income controller');
      reply.internalServerError();
    }
  }

  async findById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IncomeDto> {
    try {
      const id = Number(request.params['id']);
      const userId = request.user['id'] as string;

      const result = await this.incomeRepository.findById(id, userId);
      if (result) {
        reply.code(200);
        return IncomeMapper.toDto(result);
      } else {
        reply.notFound('No Income Found');
      }
    } catch (error: unknown) {
      logError(error, 'income controller');
      reply.internalServerError();
    }
  }

  async findByCurrentMonth(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IncomeDto[]> {
    try {
      const currentMonth = new Date(request.headers.date);
      const userId = request.user['id'] as string;

      const results = await this.incomeRepository.findByMonth(
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
    try {
      const reqIncome = request.body as CreateIncomeDto;
      const userId = request.user['id'] as string;

      await this.incomeRepository.create(reqIncome, userId);
      return reply.code(201);
    } catch (error: unknown) {
      logError(error, 'income controller');
      reply.internalServerError();
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const reqIncome = request.body as IncomeDto;
      const userId = request.user['id'] as string;

      if (id !== reqIncome.id) {
        return reply.badRequest();
      }

      const entity = IncomeMapper.toEntity(reqIncome, userId);
      await this.incomeRepository.update(entity);
      return reply.code(202);
    } catch (error: unknown) {
      logError(error, 'income controller');
      reply.internalServerError();
    }
  }

  async remove(request: FastifyRequest, reply: FastifyReply) {
    try {
      const id = Number(request.params['id']);
      const reqIncome = request.body as IncomeDto;
      const userId = request.user['id'] as string;

      if (id !== reqIncome.id) {
        return reply.badRequest();
      }

      const entity = IncomeMapper.toEntity(reqIncome, userId);
      await this.incomeRepository.delete(entity);
      reply.code(202);
    } catch (error: unknown) {
      logError(error, 'income controller');
      reply.internalServerError();
    }
  }
}
