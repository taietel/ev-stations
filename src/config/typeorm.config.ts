import { DataSourceOptions } from 'typeorm';
import DbConfig from './database.config';
import * as dotenv from 'dotenv';

dotenv.config({
  path: ['.env.test', `.env.${process.env.NODE_ENV}`],
});

const typeormConfig = DbConfig() as DataSourceOptions;

export default typeormConfig;
