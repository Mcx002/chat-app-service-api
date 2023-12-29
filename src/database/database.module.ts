import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsModule } from 'src/configs/configs.module';
import { UserEntity } from 'src/users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigsModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'mongodb',
                host: configService.get('db.host'),
                port: configService.get('db.port'),
                username: configService.get('db.username'),
                password: configService.get('db.password'),
                database: configService.get('db.name'),
                entities: [UserEntity],
                synchronize: configService.get('app.env') === 'production' ? false : true,
                authSource: 'admin',
            }),
            inject: [ConfigService],
        })
    ],
})
export class DatabaseModule { }
