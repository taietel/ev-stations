import { DataSourceOptions } from 'typeorm';
import DbConfig from './database.config';
import * as dotenv from 'dotenv';

dotenv.config();

const typeormConfig = DbConfig() as DataSourceOptions;

export default typeormConfig;
