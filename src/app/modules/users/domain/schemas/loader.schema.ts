import { FastifyInstance } from 'fastify';
import { UserSchema } from './user.schema';
import fp from 'fastify-plugin';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(UserSchema);
}
