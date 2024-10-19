import { FastifyInstance } from 'fastify';
import { PositionsController } from '../../../controller/positions.controller';

export default async function (fastify: FastifyInstance) {
  const positionsController = new PositionsController();

  fastify.get('', async () => await positionsController.getAllPositions());

  fastify.get('/:id', async (request) => {
    const positionId = request.params['id'];
    return await positionsController.getPositionById(positionId);
  });

  fastify.get('/summary', async () => await positionsController.getSummary());
}
