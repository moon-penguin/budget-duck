import { Position, PrismaClient } from '@prisma/client';
import { errorHandlerUtils } from '../utils/errorHandler.utils';

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
      errorHandlerUtils(error, 'position repository');
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
      errorHandlerUtils(error, 'position repository');
    }
  }

  async create(position: Position): Promise<Position> {
    try {
      return await this.database.position.create({
        data: position,
      });
    } catch (error: unknown) {
      errorHandlerUtils(error, 'position repository');
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
      errorHandlerUtils(error, 'position repository');
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
      errorHandlerUtils(error, 'position repository');
    }
  }
}
