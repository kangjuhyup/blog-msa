import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEntity } from '@entity/article.entity';

@Injectable()
export class ArticleRepository {
  constructor(
    @Inject('ARTICLE_REPOSITORY') private repository: Repository<ArticleEntity>,
  ) {}

  upsert(article: ArticleEntity): Promise<ArticleEntity> {
    return this.repository.save(article).catch((err) => {
      throw err;
    });
  }

  findOne(article_uuid: string): Promise<ArticleEntity> {
    return this.repository.findOne({
      where: {
        article_uuid,
      },
    });
  }
}