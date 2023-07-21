import { ArticleEntity } from '@entity/article.entity';
import { UserEntity } from '@entity/user.entity';
import { DataSource } from 'typeorm';

interface DatabaseParam {
    host : string,
    port : number,
    username : string,
    password : string,
    database : string
}

export const databaseProvider = ({
    host,
    port,
    username,
    password,
    database
}: DatabaseParam) => {
  console.log('host => ' , host);
  console.log('port => ', port);
  console.log('username => ' , username);
  console.log('password => ' ,password);
  console.log('database => ', database);
    return [
        {
            provide: 'DATA_SOURCE',
            useFactory: async () => {
              const dataSource = new DataSource({
                type: 'postgres',
                host,
                port,
                username,
                password,
                database,
                entities: [
                  UserEntity,
                  ArticleEntity,
                  ],               
                synchronize: true,
              });
              console.log('entities : ' , dataSource.entityMetadatas);
              return dataSource.initialize();
            },
          },
    ]
}
