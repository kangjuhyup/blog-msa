import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '@entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<UserEntity>,
  ) {}

  async upsert(user: UserEntity): Promise<UserEntity> {
    return await this.repository.save(user);
  }

  

  async findOne(address: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: {
        address: address,
      },
    });
  }
}
