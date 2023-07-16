import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Module({})
export class KafkaModule {
  static forRoot(clientId: string) {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.register([
          {
            name: 'AUTH_MICROSERVICE',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: clientId,
                brokers: ['localhost:29092'],
              },
              consumer: {
                groupId: `${clientId.toLocaleLowerCase()}-consumer`,
              },
              producer: { createPartitioner: Partitioners.LegacyPartitioner },
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
