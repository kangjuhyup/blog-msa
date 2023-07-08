import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


  
  @Injectable()
  export class JwtGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
      console.log('user : ', user)
      console.log('info : ' , info);
      if (err || !user) {
        // 인증 실패
        console.error(err); // 에러 로그 출력
        throw err;
      }
      // 인증 성공
      return user;
    }
  }