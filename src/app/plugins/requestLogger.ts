import fp from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default fp(async function requestLogger(fastify: FastifyInstance) {
  fastify.addHook(
    'onRequest',
    async (request: FastifyRequest, reply: FastifyReply) => {
      fastify.log.info(request, reqMessage(request, reply));
    }
  );
});

function reqMessage(request: FastifyRequest, reply: FastifyReply) {
  return `[HTTP] ${request.method}: ${request.url} ${reply.statusCode}`;
}
