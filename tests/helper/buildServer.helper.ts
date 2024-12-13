import Fastify from 'fastify';
import { app } from '../../src/app/app';

// usage: for api testing, build server with my routes
export async function buildServer() {
  const server = Fastify({
    logger: {
      level: 'error',
    },
    disableRequestLogging: true,
    ignoreDuplicateSlashes: true,
  });

  server.register(app);

  return server;
}
