import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExportFiles } from './csv/export.service';
import { DiseaseController } from './disease/disease.controller';
import { DiseaseModule } from './disease/disease.module';
import { DiseaseService } from './disease/disease.service';
import { GoFileService } from './goFile/goFile.service';

@Module({
  imports: [DiseaseModule, HttpModule, ScheduleModule.forRoot()],
  controllers: [AppController, DiseaseController],
  providers: [AppService, DiseaseService, ExportFiles, GoFileService],
})
export class AppModule {}
