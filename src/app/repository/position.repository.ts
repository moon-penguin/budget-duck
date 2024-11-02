import { Position, Prisma, PrismaClient } from '@prisma/client';
import { logError } from '../utils/logError.utils';

export class PositionRepository {
  private database: PrismaClient;

  constructor(database: PrismaClient) {
    this.database = database;
  }

  async findAll(): Promise<Position[]> {
    try {
      return await this.database.position.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error: unknown) {
      logError(error, 'position repository');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`${error.meta.cause}`);
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
      logError(error, 'position repository');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`${error.meta.cause}`);
      }
    }
  }

  async create(position: Position): Promise<Position> {
    try {
      return await this.database.position.create({
        data: position,
      });
    } catch (error: unknown) {
      logError(error, 'position repository');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`${error.meta.cause}`);
      }
    }
  }

  async update(position: Position): Promise<Position> {
    try {
      return await this.database.position.update({
        data: position,
        where: {
          id: position.id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'position repository');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw Error(`${error.meta.cause}`);
      }
    }
  }

  async delete(position: Position): Promise<Position> {
    try {
      return await this.database.position.delete({
        where: {
          id: position.id,
        },
      });
    } catch (error: unknown) {
      logError(error, 'position repository');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`${error.meta.cause}`);
      }
    }
  }
}
