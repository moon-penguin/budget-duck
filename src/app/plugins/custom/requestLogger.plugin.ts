import fp from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default fp(requestLogger);

async function requestLogger(fastify: FastifyInstance) {
  fastify.addHook(
    'onResponse',
    async (request: FastifyRequest, reply: FastifyReply) => {
      fastify.log.info(request, reqMessage(request, reply));
    }
  );
}

function reqMessage(request: FastifyRequest, reply: FastifyReply) {
  return `[HTTP] ${request.method}: ${request.url} ${reply.statusCode}`;
}
