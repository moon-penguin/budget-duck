import { pinoLogger } from './logger.utils';

export function logError(error: unknown, title: string) {
  if (error instanceof Error) {
    pinoLogger.error({
      error: error,
      msg: `[ ${title} ] ${error.message}`,
      stack: error.stack,
    });
  }
}
