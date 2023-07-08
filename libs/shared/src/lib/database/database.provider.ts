import { DataSource } from 'typeorm';

interface DatabaseParam {
    host : string,
    port : number,
    username : string,
    password : string,
    database : string
}

export const databaseProviders = ({
    host,
    port,
    username,
    password,
    database
}: DatabaseParam) => {
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
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
              });
        
              return dataSource.initialize();
            },
          },
    ]
}
