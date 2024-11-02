import Fastify from 'fastify';
import { app } from './app/app';
import applicationConfig from './app/configuration/application.config';
import { pinoLogger } from './app/utils/logger.utils';

const host = applicationConfig.host;
const port = applicationConfig.port;

const server = Fastify({
  logger: pinoLogger,
});

server.register(app);

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
