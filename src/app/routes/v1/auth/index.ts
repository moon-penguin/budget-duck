import { FastifyInstance } from 'fastify';
import { UserRepository } from '../../../modules/users/repository/user.repository';
import { UserController } from '../../../modules/users/controller/user.controller';

export default async function (fastify: FastifyInstance) {
  const userRepository = new UserRepository(fastify['prisma']);
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
