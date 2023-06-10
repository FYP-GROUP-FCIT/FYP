import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';
// default directories
const ENTITIES_DIR = resolve(
  __dirname,
  '../',
  '**',
  'entities',
  '*.entity.{ts,js}'
);

const MIGRATIONS_DIR = resolve(
  __dirname,
  '../',
  '**',
  'migrations',
  '*.{ts,js}'
);
const ORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'fcit',
  synchronize: false,
  entities: [ENTITIES_DIR],
  autoLoadEntities: true,
  dropSchema: false,
  migrations: [MIGRATIONS_DIR],
};
module.exports = ORMConfig;
