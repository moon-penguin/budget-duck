import { PositionBuilder } from '../builder/PositionBuilder.builder';
import { formatISO } from 'date-fns';

export class PositionsController {
  private mockPositions = [
    new PositionBuilder().build(),
    new PositionBuilder().build({
      id: '2',
      value: 1000,
      title: 'fridge',
      category: ['food'],
    }),
  ];

  async getPositionById(id: string) {
    try {
      const result = this.mockPositions.find((position) => position.id === id);
      return result;
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
      return this.mockPositions;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { message: 'Could not get all positions. ' };
      }
    }
  }

  async getSummary() {
    const summary = this.mockPositions.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
    return {
      summary,
      timestamp: formatISO(new Date()),
      positions: this.mockPositions,
    };
  }
}
