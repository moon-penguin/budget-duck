import { ExceptionBase } from './exception-base';

export class NotFoundException extends ExceptionBase {
  static readonly message = 'Not found';
  readonly error = 'Not Found';
  readonly statusCode = 404;

  constructor(message = NotFoundException.message) {
    super(message);
  }
}
