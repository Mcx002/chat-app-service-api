import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { AnonymousGuard } from '../guards/anonymous.guard';

@Controller('auth')
@UseGuards(AnonymousGuard)
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    register(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<TokenDto> {
        return this.authService.register(createUserDto);
    }

    @Post('/login')
    login(@Body(new ValidationPipe()) loginDto: LoginDto): Promise<TokenDto> {
        return this.authService.login(loginDto);
    }
}
