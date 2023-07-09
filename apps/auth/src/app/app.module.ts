import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthJwtModule } from './jwt/jwt.module';
import { UserModule } from './repository/user.module';
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices';
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
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UserModule,
    // AuthJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
