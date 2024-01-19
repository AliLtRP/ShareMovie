import { AuthGuard } from '@nestjs/passport';

export class FreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
