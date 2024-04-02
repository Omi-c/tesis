import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { Inventary } from './inventary.model';
import { InventaryService } from './inventary.service';

@Controller('inventary')
export class InventaryController {
  constructor(private readonly inventaryService: InventaryService) {}

  @Get()
  async getAllInventary(): Promise<Inventary[]> {
    return this.inventaryService.findAll();
  }

  @Get(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number) {
      return await this.inventaryService.findOne(id);
  }

  @Post()
  async createInventary(@Body() inventaryData: Inventary): Promise<any> {
    return this.inventaryService.create(inventaryData);
  }
}
