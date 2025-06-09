import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { LoginUserSchema } from './loginUser.schema';
import {
  LoginResponseSchema,
  RefreshResponseSchema,
} from './loginResponse.schema';
import { RegisterUserSchema } from './registerUser.schema';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(LoginUserSchema);
  fastify.addSchema(LoginResponseSchema);
  fastify.addSchema(RefreshResponseSchema);
  fastify.addSchema(RegisterUserSchema);
}
