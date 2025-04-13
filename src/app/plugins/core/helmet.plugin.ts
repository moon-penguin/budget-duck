import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifyHelmet from '@fastify/helmet';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(fastifyHelmet);
});
