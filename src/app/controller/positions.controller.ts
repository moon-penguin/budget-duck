import { PositionService } from '../services/position.service';
import { Position } from '@prisma/client';
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
      if (error instanceof Error) {
        reply.notFound(error.message);
      }
    }
  }

  async getAllPositions(request: FastifyRequest, reply: FastifyReply) {
    try {
      return await this.positionService.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.internalServerError(error.message);
      }
    }
  }

  async createPosition(request: FastifyRequest, reply: FastifyReply) {
    const reqPosition = request.body as Position;

    try {
      reply.statusCode = 202;
      await this.positionService.create({
        ...reqPosition,
        date: new Date(reqPosition.date),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.conflict(error.message);
      }
    }
  }

  async updatePosition(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reqPosition = request.body as Position;

      await this.positionService.update({
        ...reqPosition,
        date: new Date(reqPosition.date),
      });
      reply.statusCode = 204;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.notFound(error.message);
      }
    }
  }

  async deletePosition(request: FastifyRequest, reply: FastifyReply) {
    const reqPosition = request.body as Position;

    try {
      await this.positionService.delete({
        ...reqPosition,
        date: new Date(reqPosition.date),
      });
      reply.statusCode = 202;
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.notFound(error.message);
      }
    }
  }
}
