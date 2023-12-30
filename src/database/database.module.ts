import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsModule } from '../configs/configs.module';
import { UserEntity } from '../users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigsModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'mongodb',
                url: configService.get('db.url'),
                useNewUrlParser: true,
                entities: [UserEntity],
                synchronize: configService.get('app.env') === 'production' ? false : true,
                authSource: 'admin',
            }),
            inject: [ConfigService],
        })
    ],
})
export class DatabaseModule { }
