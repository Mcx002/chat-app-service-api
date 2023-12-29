import { IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @MinLength(3)
    credential: string;

    @IsString()
    password: string;
}