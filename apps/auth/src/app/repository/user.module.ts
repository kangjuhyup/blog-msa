import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { databaseProvider } from '@database/database.provider'
import { UserProvider } from './user.provider';

@Module({
    providers : [
        
            // {
            //     provide: 'DATA_SOURCE',
            //     useFactory: async () => {
            //       const dataSource = new DataSource({
            //         type: 'postgres',
            // host: process.env.DATABASE_HOST,
            // port: parseInt(process.env.DATABASE_PORT),
            // username: process.env.DATABASE_USERNAME,
            // password: process.env.DATABASE_PASSWORD,
            // database: process.env.DATABASE_NAME,
            //         entities: [
            //             __dirname + '/../**/*.entity{.ts,.js}',
            //         ],
            //         // synchronize: true,
            //       });
            
            //       return dataSource.initialize();
            //     },
            //   },
        
        ...databaseProvider({
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        }),
        ...UserProvider,
        UserRepository,
    ],
    exports : [
        UserRepository,
        ...UserProvider
    ]
})
export class UserModule {}
