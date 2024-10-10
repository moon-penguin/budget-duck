import Fastify from 'fastify';
import { app } from './app/app';
import { loggerConfig } from './app/configuration/loggerConfig';
import appConfig from './app/configuration/appConfig';

const host = appConfig.host;
const port = appConfig.port;

const server = Fastify({
  logger: loggerConfig,
  disableRequestLogging: true,
});

server.register(app);

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
