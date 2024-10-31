import { formatISO } from 'date-fns';
import { PositionService } from '../services/position.service';
import { Position } from '@prisma/client';
import { errorHandlerUtils } from '../utils/errorHandler.utils';
import { FastifyReply, FastifyRequest } from 'fastify';

export class PositionsController {
  private positionService: PositionService;

  constructor(positionService: PositionService) {
    this.positionService = positionService;
  }

  async getPositionById(request: FastifyRequest, reply: FastifyReply) {
    const id = request.params['id'];
    try {
      reply.statusCode = 202;
      return await this.positionService.findById(id);
    } catch (error: unknown) {
      errorHandlerUtils(error, 'position controller');
      reply.notFound(`Position with id: ${id} not found.`);
    }
  }

  async getAllPositions(request: FastifyRequest, reply: FastifyReply) {
    try {
      return await this.positionService.findAll();
    } catch (error: unknown) {
      errorHandlerUtils(error, 'position controller');
      reply.internalServerError();
    }
  }

  async createPosition(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reqPosition = request.body as Position;

      reply.statusCode = 202;
      return await this.positionService.create({
        ...reqPosition,
        date: new Date(reqPosition.date),
      });
    } catch (error: unknown) {
      errorHandlerUtils(error, 'position controller');
      reply.internalServerError();
    }
  }

  async updatePosition(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reqPosition = request.body as Position;

      reply.statusCode = 202;

      return await this.positionService.update({
        ...reqPosition,
        date: new Date(reqPosition.date),
      });
    } catch (error: unknown) {
      errorHandlerUtils(error, 'position controller');
      reply.internalServerError();
    }
  }

  async deletePosition(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reqPosition = request.body as Position;

      reply.statusCode = 202;
      await this.positionService.delete({
        ...reqPosition,
        date: new Date(reqPosition.date),
      });
    } catch (error: unknown) {
      errorHandlerUtils(error, 'position controller');
      reply.internalServerError();
    }
  }

  async getSummary() {
    const allPositions = await this.positionService.findAll();
    const summary = allPositions.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
    return {
      summary,
      timestamp: formatISO(new Date()),
      positions: allPositions,
    };
  }
}
