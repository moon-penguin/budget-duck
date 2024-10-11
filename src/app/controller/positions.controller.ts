export class PositionsController {
  async getPositionById(id: string) {
    return {
      msg: `position by id: ${id}`,
    };
  }

  async getAllPositions() {
    return {
      msg: 'all positions',
    };
  }

  async getSummary() {
    return {
      msg: 'summary of positions',
    };
  }
}
