/* eslint-disable prettier/prettier */
import dotenv from 'dotenv'
dotenv.config(); 
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ExportFiles } from 'src/csv/export';
import { DiseaseData } from 'src/interface/disease';

@Injectable()
export class DiseaseService {
  constructor(private readonly httpService: HttpService) {}
  async getAllDisease1(countries: string) {
    const url = `https://disease.sh/v3/covid-19/countries/${countries}`;
    const diseaseResponse = this.httpService.axiosRef.get(url)
    const result : DiseaseData =  (await diseaseResponse).data;  
    return result; 
  }
}
