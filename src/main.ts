import Fastify from 'fastify';
import { app } from './app/app';
import applicationConfig from './app/configuration/application.config';
import { pinoLogger } from './app/shared/utils/logger.utils';
import closeWithGrace from 'close-with-grace';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const host = applicationConfig.host;
const port = applicationConfig.port;

const server = Fastify({
  logger: pinoLogger,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(app);

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

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
