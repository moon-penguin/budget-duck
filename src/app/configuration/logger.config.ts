import { PinoLoggerOptions } from 'fastify/types/logger';

export const loggerConfig: PinoLoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      crlf: false,
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname,req',
    },
  },
};
