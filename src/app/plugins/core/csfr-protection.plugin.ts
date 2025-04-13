import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifyCsrfProtection from '@fastify/csrf-protection';

export default fp(async function (fastify: FastifyInstance) {
  await fastify.register(fastifyCsrfProtection);
});
