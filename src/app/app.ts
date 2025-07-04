import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins', 'config'),
    options: { ...opts },
  });

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins', 'core'),
    options: { ...opts },
  });

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins', 'custom'),
    options: { ...opts },
  });

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'modules'),
    indexPattern: /loader.schema.ts/,
  });

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'shared', 'schema'),
    indexPattern: /loader.schema.ts/,
  });

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { prefix: 'api', ...opts },
    routeParams: true,
  });

  fastify.setNotFoundHandler(
    {
      preHandler: fastify.rateLimit({
        max: 3,
        timeWindow: 5000,
      }),
    },
    async (request, reply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          },
        },
        'Resource not found'
      );

      return reply.notFound();
    }
  );
}
