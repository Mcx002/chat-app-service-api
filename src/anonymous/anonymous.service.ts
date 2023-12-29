import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AnonymousService {
    constructor(private configService: ConfigService) { }

    createAnonymousToken(authorization: string): string {
        // parse data
        const [authType, token] = authorization.split(' ');

        // check auth type
        if (authType !== 'Basic') {
            throw new UnauthorizedException();
        }

        // validate anonymous credentials
        const [username, password] = Buffer.from(token, 'base64').toString('utf-8').split(':')
        if (
            username !== this.configService.get('anonymous.username') &&
            password !== this.configService.get('anonymous.password')
        ) {
            throw new UnauthorizedException();
        }

        // set anonymous token for 7 days
        const jwtToken = jwt.sign({
            username,
        }, this.configService.get('jwt.secretKey'), {
            expiresIn: 60 * 60 * 24 * 7,
        })

        return jwtToken
    }
}
