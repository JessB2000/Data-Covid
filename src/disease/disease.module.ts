/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoFileService } from 'src/goFile/goFile.service';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';

@Module({
  imports: [HttpModule],
  controllers: [DiseaseController],
  providers: [DiseaseService, GoFileService],
  exports: [DiseaseService],
})
export class DiseaseModule {}
