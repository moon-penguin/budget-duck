import { FastifyInstance } from 'fastify';
import { UserRepository } from '../../../repository/user.repository';
import { UsersController } from '../../../controller/users.controller';

export default async function (fastify: FastifyInstance) {
  const userRepository = new UserRepository(fastify['prisma']);
  const userController = new UsersController(userRepository);

  fastify.post('/register', async (request, reply) => {
    return await userController.registerUser(request, reply);
  });
}
