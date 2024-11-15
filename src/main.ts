import Fastify from 'fastify';
import { app } from './app/app';
import applicationConfig from './app/configuration/application.config';
import { pinoLogger } from './app/utils/logger.utils';
import closeWithGrace from 'close-with-grace';

const host = applicationConfig.host;
const port = applicationConfig.port;

const server = Fastify({
  logger: pinoLogger,
});

server.register(app);

closeWithGrace(async function ({ signal, err }) {
  if (err) {
    server.log.error({ err }, 'server closing with error');
  } else {
    server.log.info(`${signal} received, server closing`);
  }
  await server.close();
});

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
