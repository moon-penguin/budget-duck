import { FastifyInstance } from 'fastify';
import { LoginUserSchema } from '../../modules/authentication/domain/schemas/loginUser.schema';
import {
  LoginResponseSchema,
  RefreshResponseSchema,
} from '../../modules/authentication/domain/schemas/loginResponse.schema';
import { RegisterUserSchema } from '../../modules/authentication/domain/schemas/registerUser.schema';
import { AuthenticationController } from '../../modules/authentication/controller/auth.controller';

export default async function (fastify: FastifyInstance) {
  const authenticationController = new AuthenticationController();

  fastify.post(
    '/register',
    {
      schema: {
        body: RegisterUserSchema,
      },
    },
    async (request, reply) => {
      return await authenticationController.register(request, reply);
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
      return await authenticationController.login(request, reply);
    }
  );

  fastify.post(
    '/refresh',
    {
      onRequest: fastify.authenticate,
      schema: {
        response: {
          200: RefreshResponseSchema,
        },
      },
    },
    async (request, reply) => {
      return await authenticationController.refreshToken(request, reply);
    }
  );

  fastify.post(
    '/logout',
    {
      onRequest: fastify.authenticate,
    },
    async (request, reply) => {
      return await authenticationController.logout(request, reply);
    }
  );

  fastify.get(
    '/me',
    { onRequest: fastify.authenticate },
    async (request, reply) => {
      return await authenticationController.me(request, reply);
    }
  );
}
