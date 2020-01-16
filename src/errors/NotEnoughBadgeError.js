const BaseError = require('./BaseError');

class NotEnoughBadgeError extends BaseError {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  NotEnoughBadgeError
}
