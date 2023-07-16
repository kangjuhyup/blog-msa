import { VerifyDto } from '@dto/auth/verify.dto';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response,Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('nonce')
  getNonce(
      @Req() request:Request,
      @Res() response:Response
  ) {
    return this.service.getNonce(request,response);
  }

  @Post('logIn')
  logIn(
    @Req() request:Request,
    @Res() response:Response,
    @Body() dto : VerifyDto
  ) {
      console.log('logIn')
      return this.service.logIn(request,response,dto);
  }

  @Get('logOut')
  logOut(
      @Req() request:Request,
  ) {
      return this.service.logOut(request);
  }
}
