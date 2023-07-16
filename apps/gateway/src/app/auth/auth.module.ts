import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KafkaModule } from '../kafka/kafka.module';
@Module({
  imports: [
    KafkaModule.forRoot('auth'),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}