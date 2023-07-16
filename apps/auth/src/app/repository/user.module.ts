import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { databaseProvider } from '@database/database.provider'
import { UserProvider } from './user.provider';

const dbProvider = databaseProvider({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
})

@Module({
  providers: [...dbProvider, UserRepository, ...UserProvider],
  exports: [UserRepository, ...UserProvider, ...dbProvider],
})
export class UserModule {}
