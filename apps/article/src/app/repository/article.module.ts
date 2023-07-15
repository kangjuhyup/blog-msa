import { Module } from '@nestjs/common';
import { databaseProvider } from '@database/database.provider'
import { ArticleRepository } from './article.repository';
import { ArticleProvider } from './article.provider';

@Module({
    providers : [
        ...databaseProvider({
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        }),
        ...ArticleProvider,
        ArticleRepository,
    ],
    exports : [
        ArticleRepository,
        ...ArticleProvider
    ]
})
export class ArticleModule {}
