import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthRequestTopic } from '@topic/auth.topic';
import { VerifyDto } from '@dto/auth/verify.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(AuthRequestTopic.GET_NONCE)
  getNonce(
  ) {
    return this.appService.getNonce();
  }

  @EventPattern(AuthRequestTopic.LOGIN)
  verifyUser(
    address:string
  ) {
    return this.appService.verifyUser(address);
  }

  @EventPattern(AuthRequestTopic.VERIFY)
  verify(
    nonce: string,
    dto: VerifyDto,
  ) {
    return this.appService.verifyMessage(nonce,dto)
  }
}
