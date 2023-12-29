import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './configs/configs.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AnonymousModule } from './anonymous/anonymous.module';

@Module({
  imports: [ConfigsModule, DatabaseModule, UsersModule, AuthModule, AnonymousModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
