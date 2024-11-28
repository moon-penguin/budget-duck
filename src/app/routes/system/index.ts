import { FastifyInstance } from 'fastify';
import * as process from 'node:process';
import { formatISO } from 'date-fns';

export default async function (fastify: FastifyInstance) {
  fastify.get('/health', async (request, reply) => {
    const system = healthCheck();

    if (system.message === 'OK') {
      reply.status(200);
      return system;
    } else {
      reply.serviceUnavailable();
      return system;
    }
  });
}

function healthCheck() {
  const healthCheck = {
    status: 'UP',
    uptime: Math.floor(process.uptime()),
    message: 'OK',
    timestamp: formatISO(new Date()),
  };

  try {
    return healthCheck;
  } catch (error: unknown) {
    if (error instanceof Error) {
      healthCheck.message = error.message;
      console.info(`[ health check ] failed: ${error.message}`);
      return healthCheck;
    }
  }
}
