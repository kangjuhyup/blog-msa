import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '@entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<UserEntity>,
  ) {}

  upsert(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user).catch((err) => {
      throw err;
    });
  }

  findOne(address: string): Promise<UserEntity> {
    return this.repository.findOne({
      where: {
        address,
      },
    });
  }
}
