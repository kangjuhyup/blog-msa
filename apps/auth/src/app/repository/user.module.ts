import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { databaseProviders } from '@database/database.provider';

@Module({
    providers : [
        ...databaseProviders({
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        }),
        UserRepository,
    ],
    exports : [
        UserRepository
    ]
})
export class UserModule {}
