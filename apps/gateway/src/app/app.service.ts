import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthRequestTopic } from '@topic/auth.topic'
import { IronSessionData } from 'iron-session'
import { VerifyDto } from '@dto/auth/verify.dto'
import { Response,Request } from 'express';
import { generateNonce, SiweMessage } from 'siwe';

declare module "iron-session" {
  interface IronSessionData {
    nonce?: string | null;
    swie? : SiweMessage | null
  }
}

@Injectable()
export class AppService {

  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getNonce(
    request:Request,
    response:Response
  ) {
    this.authClient.emit(AuthRequestTopic.GET_NONCE,null).subscribe( async (nonce:string) => {
      request.session.nonce = nonce;
      await request.session.save(); 
      response.setHeader('Content-Type', 'text/plain')
      response.send(request.session.nonce)
    })
  }

  verifyMessage(
    request:Request,
    response:Response,
    dto:VerifyDto,
  ) {
    this.authClient.emit(AuthRequestTopic.VERIFY,JSON.stringify({
      nonce : request.session.nonce,
      dto
    })).subscribe( async (fields:SiweMessage) => {
      request.session.swie = fields
      await request.session.save();
      response.send({
        success : true,
      })
    })
  }

  logIn(
  ) {
  }
}
