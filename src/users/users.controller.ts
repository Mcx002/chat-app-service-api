import { Controller, Get, Req, Session, UseGuards } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";
import { Request } from "express";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('users')
export class UsersController {
    // constructor(
    //     private usersService: UsersService,
    // ) { }

    @Get('/me')
    @UseGuards(AuthGuard)
    async me(@Req() req: Request): Promise<any> {
        return req['users']
    }
}
