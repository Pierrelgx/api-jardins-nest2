import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'lois',
  database: 'jardins_api',
  password: '696969',
  entities: ['dist/**/*.entity.js'],
  migrationsRun: false,
  synchronize: false,
  migrations: ['dist/db/migrations/**/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
