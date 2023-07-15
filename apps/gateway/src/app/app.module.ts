import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController
  ],
  providers : [

  ]
})
export class AppModule {}
