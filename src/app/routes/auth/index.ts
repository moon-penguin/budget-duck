import { FastifyInstance } from 'fastify';
import { UserController } from '../../modules/users/controller/user.controller';
import { LoginUserSchema } from '../../modules/users/domain/schemas/loginUser.schema';
import { LoginResponseSchema } from '../../modules/users/domain/schemas/loginResponse.schema';
import { CreateUserSchema } from '../../modules/users/domain/schemas/createUser.schema';

export default async function (fastify: FastifyInstance) {
  const userController = new UserController();

  fastify.post(
    '/register',
    {
      schema: {
        body: CreateUserSchema,
      },
    },
    async (request, reply) => {
      return await userController.register(request, reply);
    }
  );

  fastify.post(
    '/login',
    {
      schema: {
        body: LoginUserSchema,
        response: {
          200: LoginResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await userController.login(request, reply);
    }
  );

  fastify.post(
    '/refresh',
    {
      onRequest: fastify.authenticate,
      schema: {
        response: {
          200: LoginResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await userController.refresh(request, reply);
    }
  );

  fastify.post(
    '/logout',
    {
      onRequest: fastify.authenticate,
    },
    async (request, reply) => {
      return await userController.logout(request, reply);
    }
  );

  fastify.get(
    '/me',
    { onRequest: fastify.authenticate },
    async (request, reply) => {
      return await userController.me(request, reply);
    }
  );
}
