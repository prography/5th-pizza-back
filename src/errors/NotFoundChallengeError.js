import { BaseHttpError } from "./BaseHttpError";

export class NotFoundChallengeError extends BaseHttpError {
  constructor(message) {
    super('해당 챌린지 정보를 찾을 수 없습니다', 404);
    super.name = 'NotFoundChallengeError';
  }
}