import { PrismaClient } from '@prisma/client';
import * as process from 'node:process';

const prismaClient = new PrismaClient({
  errorFormat: 'pretty',
  datasourceUrl: process.env.DATABASE_URL,
});

export default prismaClient;
