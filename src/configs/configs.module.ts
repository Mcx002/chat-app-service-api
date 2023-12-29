import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from './validation';
import { getEnvFile } from './helper';
import configuration from './configuration';

@Module({
    imports: [ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true,
        validate: validateConfig,
        envFilePath: getEnvFile(),
    })]
})
export class ConfigsModule { }
