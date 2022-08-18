/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [DiseaseService],
  exports: [DiseaseService],
})
export class DiseaseModule {}
