import * as process from 'node:process';

const applicationConfig = {
  environment: process.env.NODE_ENV,
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
};

export default applicationConfig;
