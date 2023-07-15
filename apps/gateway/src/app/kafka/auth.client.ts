import { Transport } from "@nestjs/microservices";
import { Partitioners } from "kafkajs";

export const AuthClient = {
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
  }