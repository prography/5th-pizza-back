import BaseError from './BaseError';

class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message || 'Unauthorized Error', 401)
  }
}

exports.default = { UnauthorizedError }
