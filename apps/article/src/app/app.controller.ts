import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuthRequestTopic } from '@topic/auth.topic';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern(AuthRequestTopic.SIGN_IN)
  signIn() {
    return this.appService.signIn();
  }
}
