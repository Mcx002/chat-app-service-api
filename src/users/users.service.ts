import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { getDateFromUnix, getUnixFromDate } from 'src/helpers/time';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private dataSource: DataSource,
        private configService: ConfigService,
    ) { }

    async create(payload: CreateUserDto): Promise<UserDto> {
        // check username and email is already exists
        const users = await this.dataSource.getMongoRepository(UserEntity).count({
            $or: [
                { username: payload.username },
                { email: payload.email },
            ],
        })
        if (users > 0) {
            throw new ConflictException('Username or Email has been used');
        }

        // hash password
        const hashedPassword = createHash('sha256').update(payload.password).digest('hex')

        // replace password
        payload.password = hashedPassword

        // create user
        const user = new UserEntity();
        user.name = payload.name
        user.username = payload.username
        user.email = payload.email
        user.password = payload.password
        user.birthDate = getDateFromUnix(payload.birthDate)
        user.address = payload.address
        user.version = 1
        await this.usersRepository.save(user)

        return this.composeUser(user)
    }

    async findOneByUsernameOrEmail(credential: string): Promise<UserDto> {
        const user = await this.dataSource.getMongoRepository(UserEntity).find({
            where: {
                $or: [
                    { username: credential },
                    { email: credential },
                ]
            }
        })
        if (user.length === 0) {
            throw new BadRequestException('User is not found')
        }

        return this.composeUser(user[0])
    }

    async findById(id: string): Promise<UserDto> {
        const objectId = new ObjectId(id)
        const user = await this.dataSource.getMongoRepository(UserEntity).findOne({
            where: { _id: objectId },
        })
        if (!user) {
            throw new BadRequestException('User is not found')
        }

        return this.composeUser(user)
    }

    composeUser(user: UserEntity): UserDto {
        // compose user
        return {
            id: user.id.toHexString(),
            name: user.name,
            username: user.username,
            email: user.email,
            birthDate: getUnixFromDate(user.birthDate),
            address: user.address,
            createdAt: getUnixFromDate(user.createdAt),
            updatedAt: getUnixFromDate(user.createdAt),
            version: user.version,
        }
    }
}
