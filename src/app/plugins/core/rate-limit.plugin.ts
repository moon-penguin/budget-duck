import fastifyRateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(rateLimit);

async function rateLimit(fastify: FastifyInstance) {
  await fastify.register(fastifyRateLimit, {
    global: true,
    max: fastify['config'].RATE_LIMIT_MAX,
    timeWindow: '5 minutes',
  });
}
