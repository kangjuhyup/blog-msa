import { UserEntity } from '@entity/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthResponseTopic } from '@topic/auth.topic';
import { v4 as uuidv4 } from 'uuid';
import { IService } from './interface/service.interface';

@Injectable()
export class AppService implements IService {

  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  signUp() {
    this.authClient.emit(AuthResponseTopic.SIGN_UP,'')
  }

  signIn() {
    this.authClient.emit(AuthResponseTopic.SIGN_IN,'')
  }
}
