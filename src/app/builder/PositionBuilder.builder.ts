import { Position } from '@prisma/client';

export class PositionBuilder {
  private position: Position = {
    id: '1',
    title: 'Bicycle',
    category: ['leisure', 'transportation'],
    cycle: 'ONCE',
    date: new Date(),
    type: 'EXPENSE',
    value: 1500,
  };

  build(metaPosition?: Partial<Position>): Position {
    return {
      ...this.position,
      ...metaPosition,
    };
  }
}
