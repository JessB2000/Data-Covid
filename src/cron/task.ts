/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiseaseService } from 'src/disease/disease.service';
import { GoFileService } from 'src/goFile/goFile.service';

@Injectable()
export class DailyTask {
  private readonly logger = new Logger(DailyTask.name);
  constructor( private readonly getCountries: DiseaseService, 
    private readonly goFile: GoFileService){}
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron(){
    const firstData = await this.getCountries.getAllDisease('usa', 'brazil'); 
    const secondData = await this.getCountries.getAllDisease('russia', 'china'); 

    const firstCsvFile = await this.getCountries.convertToCsv(firstData)
    const secondCsvFile = await this.getCountries.convertToCsv(secondData)

    await this.goFile.uploadFormData(firstCsvFile, secondCsvFile);
    await this.goFile.removeFile(firstCsvFile.path);
    await this.goFile.removeFile(secondCsvFile.path);
    
  }
}
