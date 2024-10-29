import { formatISO } from 'date-fns';
import { PositionService } from '../services/position.service';
import { Position } from '@prisma/client';

export class PositionsController {
  private positionService: PositionService;

  constructor(positionService: PositionService) {
    this.positionService = positionService;
  }

  async getPositionById(id: string) {
    try {
      return await this.positionService.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          message: `Position with id: ${id} not found.`,
        };
      }
    }
  }

  async getAllPositions() {
    try {
      return await this.positionService.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          message: 'Could not get positions.',
        };
      }
    }
  }

  async createPosition(position: Position) {
    const date = new Date(position.date);
    return await this.positionService.create({ ...position, date: date });
  }

  async getSummary() {
    const allPositions = await this.positionService.findAll();
    const summary = allPositions.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
    return {
      summary,
      timestamp: formatISO(new Date()),
      positions: allPositions,
    };
  }
}
