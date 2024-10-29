import { FastifyInstance } from 'fastify';
import { PositionsController } from '../../../controller/positions.controller';
import { PositionService } from '../../../services/position.service';
import { PositionRepository } from '../../../repository/position.repository';
import { Position, PrismaClient } from '@prisma/client';

export default async function (fastify: FastifyInstance) {
  const prisma = new PrismaClient();
  const positionsRepository = new PositionRepository(prisma);
  const positionsService = new PositionService(positionsRepository);
  const positionsController = new PositionsController(positionsService);

  fastify.get('', async () => await positionsController.getAllPositions());

  fastify.get('/:id', async (request) => {
    const positionId = request.params['id'];
    return await positionsController.getPositionById(positionId);
  });

  fastify.post('', async (request, reply) => {
    const position = request.body;
    reply.statusCode = 202;
    return await positionsController.createPosition(position as Position);
  });

  fastify.put('', async (request, reply) => {
    const position = request.body;
    reply.statusCode = 202;
    return await positionsController.updatePosition(position as Position);
  });

  fastify.get('/summary', async () => await positionsController.getSummary());
}
