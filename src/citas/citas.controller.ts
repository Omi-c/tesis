import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { Citas } from './citas.model';
import { CitasService } from './citas.service';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Get()
  async getAllCitas(): Promise<Citas[]> {
    return this.citasService.findAll();
  }

  @Get(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number) {
      return await this.citasService.findOne(id);
  }

  @Post()
  async createCitas(@Body() citasData: Citas): Promise<any> {
    return this.citasService.create(citasData);
  }
}
