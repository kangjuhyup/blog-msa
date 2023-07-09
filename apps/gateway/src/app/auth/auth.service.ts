import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthRequestTopic } from '@topic/auth.topic'
import { Response,Request } from 'express';
import { SiweMessage } from 'siwe';
import { InvaildAddressException } from '@exception/custom/invaildAddress.exception'

declare module "iron-session" {
  interface IronSessionData {
    nonce?: string | null;
    swie? : SiweMessage | null
  }
}

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {

  

  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {
  }
  async onModuleInit() {
    console.log('onMoudleInit')
    this.authClient.subscribeToResponseOf(AuthRequestTopic.GET_NONCE); 
    await this.authClient.connect();
  }

  async onModuleDestroy() {
    console.log('onModuleDestory')
    await this.authClient.close();
  }

  async getNonce(
    request:Request,
    response:Response
  ) {
    console.log('send');
    const data = this.authClient
    .send(AuthRequestTopic.GET_NONCE,'')
    .subscribe( async (nonce:string) => {
      request.session.nonce = nonce;
      await request.session.save();
      response.send({
        success : true,
        nonce : request.session.nonce
      });
    })
  }

}
