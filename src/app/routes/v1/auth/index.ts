import { FastifyInstance } from 'fastify';
import { UserRepository } from '../../../modules/users/repository/user.repository';
import { UserController } from '../../../modules/users/controller/user.controller';
import prismaClient from '../../../shared/database/prisma';

export default async function (fastify: FastifyInstance) {
  const userRepository = new UserRepository(prismaClient);
  const userController = new UserController(userRepository);

  fastify.post(
    '/register',
    {
      schema: {
        body: fastify.getSchema('schema:user'),
      },
    },
    async (request, reply) => {
      return await userController.registerUser(request, reply);
    }
  );
}
