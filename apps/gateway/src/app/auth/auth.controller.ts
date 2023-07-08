import { VerifyDto } from '@dto/auth/signIn.dto';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response,Request } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('nonce')
  getNonce(
      @Req() request:Request,
      @Res() response:Response
  ) {
    return this.service.getNonce(request,response);
  }

  @Post('verify')
  verify(
    @Req() request:Request,
    @Res() response:Response,
    @Body() dto : VerifyDto
  ) {
      return this.service.verifyMessage(request,response,dto);
  }

  @Get('logIn')
  logIn(
    @Req() request:Request,
    @Res() response:Response,
  ) {
      return this.service.logIn(request,response);
  }

  @Get('logOut')
  logOut(
      @Req() request:Request,
      @Res() response:Response
  ) {
      return this.service.logOut(request,response);
  }
}
