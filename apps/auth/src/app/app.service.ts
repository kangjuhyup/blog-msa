import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { generateNonce, SiweMessage } from 'siwe';
import { SignUpDto } from '@dto/auth/signUp.dto';
import { UserEntity } from '@entity/user.entity';
import { v4 as uuid } from 'uuid';
import { GetInfoDto } from '@dto/auth/getInfo.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository
    ) {
  }

  getNonce() {
    const nonce = generateNonce();
    return nonce;
  }

  async findUser(address: string) {
    const user = await this.userRepository.findOne(address);
    console.log('user : ' , user);
    if (user) return user;
    return undefined;
  }

  async signUp({ address }: SignUpDto) {
    const user = await this.findUser(address);
    if (!user) return await this.userRepository.upsert(new UserEntity(uuid(), address));
    else return user;
  }

  async getUserInfo({ address }: GetInfoDto) {
    const user = await this.findUser(address);
    if (!user) throw new Error();
    console.log('user => ' , user);
    return user;
  }

  async verifyMessage({ nonce, dto }) {
    const { signature, message } = dto;
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.verify({signature});
    if (!fields.success) throw fields.error;
    const user = await this.signUp({ address: fields.data.address });
    return fields;
  }
}
