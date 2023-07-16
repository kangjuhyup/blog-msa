import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { KafkaModule } from '../kafka/kafka.module';
@Module({
  imports: [
    KafkaModule.forRoot('user'),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}