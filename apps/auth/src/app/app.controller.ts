import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthRequestTopic } from '@topic/auth.topic';
import { VerifyDto } from '@dto/auth/verify.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(AuthRequestTopic.GET_NONCE)
  getNonce(
  ) {
    console.log('getNonce')
    return this.appService.getNonce();
  }
}
