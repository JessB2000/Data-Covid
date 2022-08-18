import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiseaseModule } from './disease/disease.module';
import { DiseaseService } from './disease/disease.service';

@Module({
  imports: [DiseaseModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, DiseaseService],
})
export class AppModule {}
