import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
            // producerOnlyMode: true,
            consumer: {
              groupId: 'auth-consumer',
            },
            // producer : { createPartitioner : Partitioners.LegacyPartitioner}
          },
        },
      ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}