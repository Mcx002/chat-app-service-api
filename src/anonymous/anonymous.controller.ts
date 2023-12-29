import { Controller, Get, Headers } from '@nestjs/common';
import { TokenDto } from 'src/auth/dto/token.dto';
import { AnonymousService } from './anonymous.service';

@Controller('anonymous')
export class AnonymousController {
    constructor(private service: AnonymousService) { }

    @Get('/token')
    getToken(@Headers('authorization') authorization: string): TokenDto {
        return {
            token: this.service.createAnonymousToken(authorization)
        }
    }
}
