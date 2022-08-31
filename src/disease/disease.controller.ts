/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { ExportFiles } from "src/csv/export.service";
import { DiseaseService } from "./disease.service";

@Controller('api/v1/disease')
export class DiseaseController{
//constructor(private readonly exportService: ExportFiles){}
constructor(private readonly diseaseService: DiseaseService){}

@Get()
getAllDisease(){
   return this.diseaseService.getAllDisease('usa, brazil, russia, china')
}
}