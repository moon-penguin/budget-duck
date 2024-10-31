import { FastifyInstance } from 'fastify';
import { PositionsController } from '../../../controller/positions.controller';
import { PositionService } from '../../../services/position.service';
import { PositionRepository } from '../../../repository/position.repository';
import { PrismaClient } from '@prisma/client';

export default async function (fastify: FastifyInstance) {
  const prisma = new PrismaClient();
  const positionsRepository = new PositionRepository(prisma);
  const positionsService = new PositionService(positionsRepository);
  const positionsController = new PositionsController(positionsService);

  fastify.get(
    '',
    async (request, reply) =>
      await positionsController.getAllPositions(request, reply)
  );

  fastify.get('/:id', async (request, reply) => {
    return await positionsController.getPositionById(request, reply);
  });

  fastify.post('', async (request, reply) => {
    return await positionsController.createPosition(request, reply);
  });

  fastify.put('', async (request, reply) => {
    return await positionsController.updatePosition(request, reply);
  });

  fastify.delete('', async (request, reply) => {
    return await positionsController.deletePosition(request, reply);
  });

  fastify.get('/summary', async () => await positionsController.getSummary());
}
