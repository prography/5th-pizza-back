import { BaseHttpError } from "./BaseHttpError";

export class QuotaError extends BaseHttpError {
  constructor(message) {
    super('Quota 정보가 없음', 400);
    super.name = 'QuotaError';
  }
}