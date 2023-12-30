import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { TokenDto } from './dto/token.dto';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
    ) { }

    async register(payload: CreateUserDto): Promise<TokenDto> {
        const user = await this.usersService.create(payload)

        const token = jwt.sign(user, this.configService.get('jwt.secretKey'), {
            expiresIn: 60 * 60 * 24 * 1,
        })

        return {
            token,
        }
    }

    async login(payload: LoginDto): Promise<TokenDto> {
        const user = await this.usersService.findOneByUsernameOrEmail(payload.credential)

        const token = jwt.sign(user, this.configService.get('jwt.secretKey'), {
            expiresIn: 60 * 60 * 24 * 1,
        })

        return {
            token,
        }
    }

    async verifyToken(token: string): Promise<string | jwt.JwtPayload> {
        try {
            return jwt.verify(token, this.configService.get('jwt.secretKey'))
        } catch (error) {
            throw new UnauthorizedException({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Unauthorized',
                errors: error,
            })
        }
    }
}
