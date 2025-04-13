import {
  fastifyRequestContext,
  requestContext,
} from '@fastify/request-context';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

declare module '@fastify/request-context' {
  interface RequestContextData {
    requestId: string;
  }
}

async function requestContextPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifyRequestContext);

  fastify.addHook('onRequest', async (request) => {
    requestContext.set('requestId', request.id);
  });
}

export default fp(requestContextPlugin, { name: 'requestContext' });
