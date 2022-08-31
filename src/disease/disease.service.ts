/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable, UseGuards } from '@nestjs/common';
import { elementAt } from 'rxjs';
import { ExportFiles } from 'src/csv/export.service';
import { GoFileService } from 'src/goFile/goFile.service';
@Injectable()
export class DiseaseService {
  constructor(private readonly httpService: HttpService) {}
  async getAllDisease(countries) {
    const url = `https://disease.sh/v3/covid-19/countries/${countries}`;
    const diseaseResponse = await this.httpService.axiosRef.get(url);
    const result  =  diseaseResponse.data;  
    const list = result.map(elementAt=>{
      return {
       country: elementAt.country,
       todayCases: elementAt.todayCases,
       todayDeaths: elementAt.todayDeaths,
       date: new Date().toLocaleDateString(),
       active: elementAt.active,
       critical: elementAt.critical,
      }
    }) 
   const value = await ExportFiles.tocsv(list);  
    return list; 
  }
  
}
