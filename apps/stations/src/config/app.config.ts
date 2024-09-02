import DatabaseConfig from './database.config';
import * as dotenv from 'dotenv';

// @TODO - hack-ish way to load env vars - find a better way
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: 3000,
  database: { ...DatabaseConfig() },
  searchService: {
    host: process.env.SEARCH_SERVICE_HOST || 'localhost',
    port: parseInt(process.env.SEARCH_SERVICE_PORT) || 6379,
  },
});
