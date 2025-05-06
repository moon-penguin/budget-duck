import Fastify from 'fastify';
import { app } from './app/app';
import { pinoLogger } from './app/shared/utils/logger.utils';
import closeWithGrace from 'close-with-grace';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import * as process from 'node:process';
import { randomUUID } from 'node:crypto';

async function init() {
  const host = process.env.HOST;
  const port = Number(process.env.PORT);

  const server = Fastify({
    loggerInstance: pinoLogger,
    genReqId: (req) => {
      return (req.headers['request-id'] as string) ?? randomUUID();
    },
    ajv: {
      customOptions: {
        coerceTypes: 'array',
        removeAdditional: 'all',
      },
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  await server.register(app);

  closeWithGrace(async function ({ signal, err }) {
    if (err) {
      server.log.error(`[ Graceful Error ] server closing with error`);
      server.log.error({ err });
    } else {
      server.log.info(
        `[ Graceful Signal ] ${signal} received, server is closing`
      );
    }
    await server.close();
  });

  try {
    await server.listen({ port, host });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

init();
