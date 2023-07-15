import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthRequestTopic } from '@topic/auth.topic';
import { VerifyDto } from '@dto/auth/verify.dto';
import { GetInfoDto } from '@dto/auth/getInfo.dto'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(AuthRequestTopic.GET_NONCE)
  getNonce(
  ) {
    return this.appService.getNonce();
  }

  @MessagePattern(AuthRequestTopic.VERIFY)
  verifyMessage(
    nonce: string,
    dto : VerifyDto
  ) {
    return this.appService.verifyMessage(nonce,dto)
  }

  @MessagePattern(AuthRequestTopic.GET_INFO)
  getUserInfo(
    dto : GetInfoDto,
  ) {
    return this.appService.getUserInfo(dto)
  }
}
