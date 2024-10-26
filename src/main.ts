import Fastify from 'fastify';
import { app } from './app/app';
import { loggerConfig } from './app/configuration/logger.config';
import applicationConfig from './app/configuration/application.config';

const host = applicationConfig.host;
const port = applicationConfig.port;

const server = Fastify({
  logger: loggerConfig,
});

server.decorate('root', 'Hello from root');
server.register(app);

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
