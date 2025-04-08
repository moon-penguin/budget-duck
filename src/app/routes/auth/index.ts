import { FastifyInstance } from 'fastify';
import { UserController } from '../../modules/users/controller/user.controller';
import { UserSchema } from '../../modules/users/domain/schemas/UserSchema';

export default async function (fastify: FastifyInstance) {
  const userController = new UserController();

  fastify.post(
    '/register',
    {
      schema: {
        body: UserSchema,
      },
    },
    async (request, reply) => {
      return await userController.registerUser(request, reply);
    }
  );
}
