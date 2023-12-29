import { Module } from '@nestjs/common';
import { AnonymousController } from './anonymous.controller';
import { AnonymousService } from './anonymous.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AnonymousController],
  providers: [AnonymousService]
})
export class AnonymousModule { }
