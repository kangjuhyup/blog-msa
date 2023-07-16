import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
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
    data: any,
  ) {
    return this.appService.verifyMessage(data)
  }

  @MessagePattern(AuthRequestTopic.GET_INFO)
  getUserInfo(
    dto : GetInfoDto,
  ) {
    return this.appService.getUserInfo(dto)
  }
}
