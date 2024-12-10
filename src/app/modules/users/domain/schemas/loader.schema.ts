import { FastifyInstance } from 'fastify';
import { UserSchema } from './UserSchema';
import fp from 'fastify-plugin';

export default fp(loader);

async function loader(fastify: FastifyInstance) {
  fastify.addSchema(UserSchema);
}
