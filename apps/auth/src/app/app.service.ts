import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { generateNonce, SiweMessage } from 'siwe';
import { VerifyDto } from '@dto/auth/verify.dto'

@Injectable()
export class AppService {

  constructor(
    private readonly userRepository : UserRepository
  ){}

  getNonce() {
    const nonce = generateNonce();
    return nonce;
  }

  async verifyUser(
    address:string
  ) {
    const user = this.userRepository.findOne(address);
    if(user) return true;
    return false;
  }

  async verifyMessage(
    nonce:string,
    {signature,message}:VerifyDto
    ) {
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.validate(signature);
    if(fields.nonce !== nonce) throw Error();
    return fields;
  }
}
