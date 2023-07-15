import { DataSource } from "typeorm";
import { ArticleEntity } from "@entity/article.entity";

export const ArticleProvider = [
    {
        provide : 'ARTICLE_REPOSITORY',
        useFactory : (ds:DataSource) => ds.getRepository(ArticleEntity),
        inject : ['DATA_SOURCE'],
    }
]