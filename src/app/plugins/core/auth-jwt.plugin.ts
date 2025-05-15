import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { logError } from '../../shared/utils/logError.utils';
import fastifyJwt from '@fastify/jwt';

interface UserPayload {
  id: number;
  name: string;
  email: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
  interface FastifyRequest {
    generateToken: () => Promise<{ accessToken: string }>;
    revokeToken: () => Promise<void>;
  }
}

export default fp(jwtAuth, { name: 'authentication-plugin' });

async function jwtAuth(fastify: FastifyInstance) {
  await fastify.register(fastifyJwt, {
    secret: fastify.config.JWT_SECRET,
    trusted: async (request, decodedToken) => {
      const user = decodedToken as UserPayload;
      const token = request.headers.authorization.split(' ')[1];
      const isValid = await fastify.redis_validate(user.id, token);
      return isValid;
    },
    sign: {
      expiresIn: fastify.config.JWT_EXPIRE_IN,
      iss: fastify.config.JWT_TOKEN_ISSUER,
      aud: fastify.config.JWT_TOKEN_AUDIENCE,
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

  fastify.decorateRequest('revokeToken', async function () {
    await revokeToken(fastify, this.user['id']);
  });

  fastify.decorateRequest('generateToken', async function () {
    return await generateToken(this, fastify);
  });
}

async function generateToken(
  request: FastifyRequest,
  fastify: FastifyInstance
) {
  const payload: UserPayload = {
    id: request.user['id'],
    name: request.user['name'],
    email: request.user['email'],
  };

  const accessToken = fastify.jwt.sign(payload);

  await fastify.redis_insert(request.user['id'], accessToken);

  return { accessToken };
}

async function revokeToken(fastify: FastifyInstance, userId: number) {
  await fastify.redis_invalidate(userId);
}
