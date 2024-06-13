import DatabaseConfig from './database.config';
import * as dotenv from 'dotenv';

// @TODO - hack-ish way to load env vars - find a better way
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'test'}`,
});

export default () => ({
  environment: process.env.NODE_ENV || 'test',
  port: 3000,
  database: { ...DatabaseConfig() },
});
