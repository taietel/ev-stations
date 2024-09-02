import DatabaseConfig from './database.config';
import * as dotenv from 'dotenv';
import DbConfig from './database.config';

// @TODO - hack-ish way to load env vars - find a better way
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

console.log('db_config_log', DbConfig(), dotenv.config());

export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: 3000,
  database: { ...DatabaseConfig() },
});
