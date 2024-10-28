import { Position, PrismaClient } from '@prisma/client';

export class PositionRepository {
  private database: PrismaClient;

  constructor(database: PrismaClient) {
    this.database = database;
  }

  async findAll(): Promise<Position[]> {
    try {
      return await this.database.position.findMany();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`[ position repository ] error: ${error.message}`);
      }
    }
  }

  async findById(id: string): Promise<Position> {
    try {
      return await this.database.position.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`[ position repository ] error: ${error.message}`);
      }
    }
  }
}
