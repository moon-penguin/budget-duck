import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fp from 'fastify-plugin';
import { logError } from '../../shared/utils/logError.utils';

export default fp(jwtAuth, { name: 'authentication-plugin' });

async function jwtAuth(fastify: FastifyInstance) {
  const revokedTokens = new Map();

  await fastify.register(fastifyJwt, {
    secret: fastify['config'].JWT_SECRET,
    trusted: function isTrusted(request, decodedToken) {
      return !revokedTokens.has(decodedToken.jti);
    },
  });

  fastify.decorate(
    'authenticate',
    async function authenticate(request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (error: unknown) {
        logError(error, 'Server Authenticate');
        reply.unauthorized();
      }
    }
  );

  fastify.decorateRequest('revokeToken', function () {
    revokedTokens.set(this.user['jti'], true);
  });

  fastify.decorateRequest('generateToken', async function () {
    const token = fastify.jwt.sign(
      {
        id: String(this.user['_id']),
        username: this.user['username'],
      },
      {
        jti: String(Date.now()),
        expiresIn: fastify['config'].JWT_EXPIRE_IN,
      }
    );
    return token;
  });
}
