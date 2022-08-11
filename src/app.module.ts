import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiseaseController } from './disease/disease.controller';
import { DiseaseModule } from './disease/disease.module';
import { DiseaseService } from './disease/disease.service';

@Module({
  imports: [DiseaseModule, HttpModule],
  controllers: [AppController, DiseaseController],
  providers: [AppService, DiseaseService],
})
export class AppModule {}
