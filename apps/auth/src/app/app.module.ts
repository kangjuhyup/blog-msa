import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthJwtModule } from './jwt/jwt.module';
import { UserModule } from './repository/user.module';

@Module({
  imports: [
    UserModule,
    AuthJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
