import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifyCompress from '@fastify/compress';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(fastifyCompress);
});
