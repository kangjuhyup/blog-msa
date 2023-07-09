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
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

 
}
