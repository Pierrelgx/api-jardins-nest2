import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'lois',
  database: 'jardins_api',
  password: '696969',
  entities: ['dist/src/**/entities/*.entity.js'],
};

export default config;
