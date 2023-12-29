import { CommonDto } from "src/dto/common.dto";
import { CreateUserDto } from "./create-user.dto";

export class UserDto extends CommonDto {
    id: string;
    name: string;
    username: string;
    email: string;
    birthDate: number;
    address: string;
}