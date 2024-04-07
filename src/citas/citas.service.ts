import { Injectable } from '@nestjs/common';
import { Citas } from './citas.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Citas)
    private citasRepository: Repository<Citas>,
  ) {}

  create(citas: any): Promise<Citas[]>{
    const citasCreate = this.citasRepository.create(citas);
    return this.citasRepository.save(citasCreate);
  }

  findAll(): Promise<Citas[]> {
    return this.citasRepository.find();
  }

  findOne(id: number): Promise<Citas | null> {
    return this.citasRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.citasRepository.delete(id);
  }
}
