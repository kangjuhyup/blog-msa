import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
        {
          name: 'AUTH_MICROSERVICE',
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'auth',
              brokers: ['localhost:29092'],
            },
            consumer: {
              groupId: 'auth-consumer',
            },
            producer : { createPartitioner : Partitioners.LegacyPartitioner}
          },
        },
      ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}