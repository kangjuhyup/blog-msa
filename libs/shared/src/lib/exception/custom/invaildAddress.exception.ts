import { HttpException } from '@nestjs/common';
import  {StatusCode}  from '../exception.status';
export class InvaildAddressException extends HttpException {
  constructor() {
    super('가입되지 않은 어드레스입니다.', StatusCode.INVAILD_ADDRESS);
  }
}