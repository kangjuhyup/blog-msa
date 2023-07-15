import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthRequestTopic } from '@topic/auth.topic'
import { Response,Request } from 'express';
import { SiweMessage } from 'siwe';
import { InvaildAddressException } from '@exception/custom/invaildAddress.exception'
import { GetInfoDto } from '@dto/auth/getInfo.dto';
import { UserEntity } from '@entity/user.entity'
declare module "iron-session" {
  interface IronSessionData {
    nonce?: string | null;
    swie? : SiweMessage | null
  }
}

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {

  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {
  }
  async onModuleInit() {
    this.authClient.subscribeToResponseOf(AuthRequestTopic.GET_NONCE); 
    await this.authClient.connect();
  }

  async onModuleDestroy() {
    await this.authClient.close();
  }

  async getInfo(
    request:Request,
    response:Response,
    dto:GetInfoDto,
  ) {
    this.authClient
    .send(AuthRequestTopic.GET_INFO,dto)
    .subscribe( async (user:UserEntity) => {
      response.send({
        success : true,
        user : user,
      });
    })
  }

  
}
