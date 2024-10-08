import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifyCsrfProtection from '@fastify/csrf-protection';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyCsrfProtection);
});
