import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'lois',
  database: 'jardins_api',
  password: '696969',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrationsRun: false,
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
