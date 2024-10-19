import { Position } from '../interfaces/position.interface';

export class PositionBuilder {
  private position: Position = {
    id: '1',
    title: 'Bicycle',
    category: ['leisure', 'transportation'],
    cycle: 'once',
    date: new Date(),
    type: 'expense',
    value: 1500,
  };

  build(metaPosition?: Partial<Position>): Position {
    return {
      ...this.position,
      ...metaPosition,
    };
  }
}
