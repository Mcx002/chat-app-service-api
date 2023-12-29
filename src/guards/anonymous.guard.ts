import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(private configService: ConfigService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.headers.authorization) {
      throw new UnauthorizedException()
    }

    const [authType, token] = request.headers.authorization.split(' ');

    if (authType !== 'Bearer') {
      throw new UnauthorizedException()
    }

    const result: Promise<boolean> = new Promise(async (resolve, reject) => {
      try {
        jwt.verify(token, this.configService.get('jwt.secretKey'))
        resolve(true)
      } catch (error) {
        reject(new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
          errors: error,
        }))
      }
    })


    return result;
  }
}
