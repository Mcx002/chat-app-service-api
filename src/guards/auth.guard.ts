import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.headers.authorization) {
      throw new UnauthorizedException()
    }

    const [authType, token] = request.headers.authorization.split(' ')

    if (authType !== 'Bearer') {
      throw new UnauthorizedException()
    }

    const result = new Promise<boolean>(async (resolve, reject) => {

      try {
        const payload = jwt.verify(token, this.configService.get('jwt.secretKey'))

        const user = await this.usersService.findById(payload['id'])

        request['users'] = user

        resolve(true)
      } catch (error) {
        const err = error as HttpException
        reject(new UnauthorizedException(err.message))
      }
    })

    return result;
  }
}
