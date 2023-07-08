import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from './jwt.guard';
import { AccessStrategy } from './access.strategy';
import { RefreshStrategy } from './refresh.straegy';

const jwtModule = JwtModule.registerAsync({
    inject : [ConfigService],
    useFactory : (config : ConfigService) => ({
        secret : config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: '1h' },

    })
})

const refreshModule = JwtModule.registerAsync({
    inject : [ConfigService],
    useFactory : (config : ConfigService) => ({
        secret : config.get<string>('JWT_REFRESH_SECRET'),
        signOptions: { expiresIn: '1d' },

    })
})


const passportMoudle = PassportModule.register({
    defaultStrategy : 'jwt',
    session : false
})

@Module({
  imports : [
    passportMoudle,
    jwtModule,  
    refreshModule
  ],
  providers : [
      AccessStrategy,
      JwtGuard,
      RefreshStrategy,
    ],
  exports : [
      passportMoudle,
      jwtModule,
      AccessStrategy,
      RefreshStrategy,
      JwtGuard,
    ]
})
export class AuthJwtModule {}
