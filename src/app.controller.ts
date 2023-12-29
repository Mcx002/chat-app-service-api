import { Controller, Get, Headers, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthDto } from './dto/health.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHealth(): HealthDto {
    return this.appService.getHealth();
  }
}
