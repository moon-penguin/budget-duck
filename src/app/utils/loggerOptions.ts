import { PinoLoggerOptions } from 'fastify/types/logger';

export const loggerOptions: PinoLoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      crlf: false,
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
};
