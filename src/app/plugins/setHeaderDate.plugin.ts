import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { formatISO } from 'date-fns';

export default fp(setHeaderDate);

async function setHeaderDate(fastify: FastifyInstance) {
  fastify.addHook('onRequest', async (request) => {
    const currentDate = formatISO(new Date());
    request.headers.date = currentDate;
  });
}
