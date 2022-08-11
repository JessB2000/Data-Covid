/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';

@Module({
  imports: [HttpModule],
  controllers: [DiseaseController],
  providers: [DiseaseService],
  exports: [DiseaseService],
})
export class DiseaseModule {}
