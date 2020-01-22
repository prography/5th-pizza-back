import BaseError from './BaseError';

class NotEnoughBadgeError extends BaseError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default {
  NotEnoughBadgeError
}
