import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message || 'Unauthorized Error', 401)
  }
}
