import { FastifyInstance } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fp from 'fastify-plugin';
import { FastifyRedis } from '@fastify/redis';

declare module 'fastify' {
  interface FastifyInstance {
    redis: FastifyRedis;
  }
}

export default fp(session, { name: 'cookie' });

async function session(fastify: FastifyInstance) {
  await fastify.register(fastifyCookie, {
    secret: fastify.config.COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {
      secure: fastify.config.COOKIE_SECURED,
      httpOnly: true,
      sameSite: true,
    },
  });
}
