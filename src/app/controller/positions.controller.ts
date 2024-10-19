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
    const result = this.mockPositions.find((position) => position.id === id);

    if (result) {
      return result;
    } else {
      return { message: 'not found' };
    }
  }

  async getAllPositions() {
    return this.mockPositions;
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
