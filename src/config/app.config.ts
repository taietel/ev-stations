import DatabaseConfig from './database.config';

export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: 3000,
  database: { ...DatabaseConfig() },
});
