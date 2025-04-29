import { ApplicationEnvironmentConfig } from './types/configuration.types';

// Todo: change to receive config from env file
const applicationConfig: ApplicationEnvironmentConfig = {
  HOST: 'localhost',
  NODE_ENV: 'production',
  PORT: 3000,
  DB_HOST: 'localhost',
  DB_NAME: 'budget_db',
  DB_USER: 'admin',
  DB_PASSWORD: 'test',
  DB_PORT: 5432,
  DATABASE_URL: 'postgresql://admin:test@localhost:5432/budget_db',
  JWT_SECRET: 'secret',
};

export default applicationConfig;
