import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(sensible);
});
