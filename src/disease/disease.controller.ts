/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { DiseaseService } from './disease.service';

@Controller('api/v1/disease')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}
  @Get()
  async index() {
    return await this.diseaseService.getAllDisease(
      'usa, brazil, russia, china',
    );
  }
}
