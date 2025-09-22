import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as dotenv from 'dotenv';
dotenv.config();
const config = {
  name: 'postgres',
  connector: 'postgresql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_DATABASE ?? 'module-db',
};
export class PostgresDataSource extends juggler.DataSource {
  static dataSourceName = 'postgres';
  constructor(
    @inject('datasources.config.postgres', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
