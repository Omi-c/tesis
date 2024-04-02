
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventaryController } from './inventary.controller';
import { InventaryService } from './inventary.service';
import { Inventary } from './inventary.model';


@Module({
  imports: [TypeOrmModule.forFeature([Inventary])],
  controllers: [InventaryController],
  providers: [InventaryService]
})
export class inventaryModule { }