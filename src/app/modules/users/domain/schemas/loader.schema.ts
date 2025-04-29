import { FastifyInstance } from 'fastify';
import { UserSchema } from './user.schema';
import fp from 'fastify-plugin';
import { LoginUserSchema } from './loginUser.schema';
import { LoginResponseSchema } from './loginResponse.schema';
import { CreateUserSchema } from './createUser.schema';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(UserSchema);
  fastify.addSchema(LoginUserSchema);
  fastify.addSchema(LoginResponseSchema);
  fastify.addSchema(CreateUserSchema);
}
