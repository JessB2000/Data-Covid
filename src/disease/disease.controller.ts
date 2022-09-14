/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { ExportFiles } from "src/csv/export.service";
import { GoFileService } from "src/goFile/goFile.service";
import { DiseaseService } from "./disease.service";

@Controller('api/v1/disease')
export class DiseaseController{
   constructor( private readonly getCountries: DiseaseService, 
         private readonly goFile: GoFileService){}

@Get()
async getAllDisease(){
   const firstData = await this.getCountries.getAllDisease('usa', 'brazil'); 
   const secondData = await this.getCountries.getAllDisease('russia', 'china'); 

   const firstCsvFile = await this.getCountries.convertToCsv(firstData)
   const secondCsvFile = await this.getCountries.convertToCsv(secondData)

   await this.goFile.uploadFormData(firstCsvFile, secondCsvFile);
   await this.goFile.removeFile(firstCsvFile.path);
   await this.goFile.removeFile(secondCsvFile.path);
}
}