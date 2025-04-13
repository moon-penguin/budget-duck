import { requestContext } from '@fastify/request-context';

export interface SerializedException {
  message: string;
  error: string;
  correlationId: string;
  statusCode?: number;
  stack?: string;
  cause?: string;
  metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
  abstract error: string;
  abstract statusCode: number;

  public readonly correlationId: string;

  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.correlationId = requestContext.get('requestId');
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      error: this.error,
      statusCode: this.statusCode,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
