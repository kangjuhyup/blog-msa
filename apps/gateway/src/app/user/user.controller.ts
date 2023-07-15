import { GetInfoDto } from '@dto/auth/getInfo.dto';
import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Response,Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('info')
  getInfo(
      @Req() request:Request,
      @Res() response:Response,
      @Query() dto:GetInfoDto
  ) {
    return this.service.getInfo(request,response,dto);
  }
}
