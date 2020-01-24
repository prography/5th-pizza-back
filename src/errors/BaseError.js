export class BaseError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, BaseError.prototype);
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
  }
}
