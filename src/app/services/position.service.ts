import { PositionRepository } from '../repository/position.repository';
import { Position } from '@prisma/client';

export class PositionService {
  private positionRespository: PositionRepository;

  constructor(positionRepository: PositionRepository) {
    this.positionRespository = positionRepository;
  }

  async findAll(): Promise<Position[]> {
    return await this.positionRespository.findAll();
  }

  async findById(id: string): Promise<Position> {
    return await this.positionRespository.findById(id);
  }

  async create(position: Position) {
    return await this.positionRespository.create(position);
  }

  async update(position: Position) {
    return await this.positionRespository.update(position);
  }

  async delete(position: Position) {
    return await this.positionRespository.delete(position);
  }
}
