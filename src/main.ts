import Fastify from 'fastify';
import { app } from './app/app';
import applicationConfig from './app/configuration/application.config';
import { pinoLogger } from './app/shared/utils/logger.utils';
import closeWithGrace from 'close-with-grace';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import * as process from 'node:process';

async function init() {
  const host = applicationConfig.HOST;
  const port = applicationConfig.PORT;

  const server = Fastify({
    logger: pinoLogger,
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
