import { Injectable } from '@nestjs/common';
import { HealthDto } from './dto/health.dto';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

@Injectable()
export class AppService {
  private startTime = new Date()

  constructor(private configService: ConfigService) { }

  getHealth(): HealthDto {
    return {
      name: this.configService.get('app.name'),
      version: this.configService.get('app.version'),
      lifetime: moment(this.startTime).fromNow(true),
    }
  }
}
