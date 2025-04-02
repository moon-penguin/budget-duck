import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({ errorFormat: 'pretty' });

export default prismaClient;

export class PrismaService {
  static prismaClient(databaseUrl: string) {
    return new PrismaClient({
      errorFormat: 'pretty',
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }
}
