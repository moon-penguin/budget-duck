import { PinoLoggerOptions } from 'fastify/types/logger';

export const loggerConfig: PinoLoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'pid,hostname',
    },
  },
};
