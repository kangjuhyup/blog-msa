import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { generateNonce, SiweMessage } from 'siwe';
import { VerifyDto } from '@dto/auth/verify.dto'
import { SignUpDto } from '@dto/auth/signUp.dto'
import { UserEntity } from '@entity/user.entity';
import {v4 as uuid} from 'uuid';
import { GetInfoDto } from '@dto/auth/getInfo.dto';

@Injectable()
export class AppService {

  constructor(
    private readonly userRepository : UserRepository
  ){}

  getNonce() {
    const nonce = generateNonce();
    return nonce;
  }

  async findUser(
    address:string
  ) {
    const user = await this.userRepository.findOne(address);
    if(user) return user;
    return false;
  }

  async signUp(
    {address}:SignUpDto
  ) {
    const user = await this.findUser(address)
    if(user) return await this.userRepository.upsert(new UserEntity(uuid,address,))
    else return user; 
  }

  async getUserInfo(
    {address}:GetInfoDto
  ) {
    const user = await this.findUser(address);
    if(!user) throw new Error();
    return user;
  }



  async verifyMessage(
    nonce:string,
    {signature,message}:VerifyDto
    ) {
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.validate(signature);
    if(fields.nonce !== nonce) throw new Error();
    await this.signUp({address:fields.address});
    return fields;
  }
}
