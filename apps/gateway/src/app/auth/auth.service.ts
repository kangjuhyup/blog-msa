import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthRequestTopic } from '@topic/auth.topic'
import { VerifyDto } from '@dto/auth/signIn.dto'
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
export class AuthService {

  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}


  async getNonce(
    request:Request,
    response:Response
  ) {
    this.authClient.send(AuthRequestTopic.GET_NONCE,null).subscribe( async (nonce:string) => {
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
    this.authClient.send(AuthRequestTopic.VERIFY,JSON.stringify({
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
    request:Request,
    response:Response,
  ) {
    this.authClient.send(AuthRequestTopic.LOGIN,JSON.stringify({
      address : request.session.swie.address
    })).subscribe((verify:boolean) => {
      if(verify) throw new InvaildAddressException();
      else response.send({ success : true,address : request.session.swie.address})
    })
  }

  logOut(
    request:Request,
    response:Response,
  ) {
    request.session.destroy()
    response.send({
      success : true,
    })
  }
}
