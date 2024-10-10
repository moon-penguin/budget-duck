import * as process from 'node:process';

const appConfig = {
  environment: process.env.NODE_ENV,
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.PORT) || 3000,
};

export default appConfig;
