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

        if (
            token !== this.configService.get('anonymous.credential')
        ) {
            throw new UnauthorizedException();
        }

        // set anonymous token for 7 days
        const jwtToken = jwt.sign({
            id: "ANONYMOUS",
            username: "anonymous",
            name: "Anonymous",
        }, this.configService.get('jwt.secretKey'), {
            expiresIn: 60 * 60 * 24 * 7,
        })

        return jwtToken
    }
}
