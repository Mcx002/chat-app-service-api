import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
  ) { }
  async use(req: Request, res: Response, next: () => void) {
    const [authType, token] = req.headers.authorization.split(' ')

    if (authType !== 'Bearer') {
      throw new UnauthorizedException()
    }

    const payload = await this.authService.verifyToken(token)
    console.log(payload)
    next();
  }
}
