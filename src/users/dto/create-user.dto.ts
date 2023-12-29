import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @IsEmail()
    @MinLength(5)
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsNumber()
    birthDate: number;

    @IsString()
    address: string;
}