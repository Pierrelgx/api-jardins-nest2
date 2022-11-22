import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: parseInt(configService.get('DATABASE_PORT')),
  username: configService.get('DATABASE_USER'),
  database: configService.get('DATABASE_NAME'),
  password: configService.get('DATABASE_PASSWORD'),
  entities: ['dist/**/*.entity.js'],
  migrationsRun: false,
  synchronize: false,
  migrations: ['dist/db/migrations/**/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
