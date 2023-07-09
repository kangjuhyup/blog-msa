import { DataSource } from "typeorm";
import { UserEntity } from '@entity/user.entity';

export const UserProvider = [
    {
        provide : 'USER_REPOSITORY',
        useFactory : (ds:DataSource) => ds.getRepository(UserEntity),
        inject : ['DATA_SOURCE'],
    }
]