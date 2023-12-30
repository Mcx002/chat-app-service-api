import { Controller, Get, Req, Session, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "../guards/auth.guard";

@Controller('users')
export class UsersController {
    // constructor(
    //     private usersService: UsersService,
    // ) { }

    @Get('/me')
    @UseGuards(AuthGuard)
    me(@Req() req: Request): any {
        return req['users']
    }
}
