import { VerifyDto } from '@dto/auth/verify.dto';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response,Request } from 'express';

@Controller('article')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Post('write')
  getNonce(
      @Req() request:Request,
      @Res() response:Response,
      @Body() dto: writeDto
  ) {
    return this.service.write(request,response);
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
