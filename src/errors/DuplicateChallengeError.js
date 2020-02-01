import { BaseHttpError } from "./BaseHttpError";

export class DuplicateChallengeError extends BaseHttpError {
  constructor() {
    super('동일한 챌린지가 있습니다.', 422);
    super.name = 'DuplicateChallengeError';
  }
}
