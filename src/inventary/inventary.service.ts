import { Injectable } from '@nestjs/common';
import { Inventary } from './inventary.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InventaryService {
  constructor(
    @InjectRepository(Inventary)
    private inventaryRepository: Repository<Inventary>,
  ) {}

  create(inventary: any): Promise<Inventary[]>{
    const inventaryCreate = this.inventaryRepository.create(inventary);
    return this.inventaryRepository.save(inventaryCreate);
  }

  findAll(): Promise<Inventary[]> {
    return this.inventaryRepository.find();
  }

  findOne(id: number): Promise<Inventary | null> {
    return this.inventaryRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.inventaryRepository.delete(id);
  }
}
