import { FastifyInstance } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fp from 'fastify-plugin';

// TODO: add jtw to cookie and use refreshToken

export default fp(cookie, { name: 'cookie' });

async function cookie(fastify: FastifyInstance) {
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
