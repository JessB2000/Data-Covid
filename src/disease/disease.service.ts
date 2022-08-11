/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class DiseaseService {
  constructor(private readonly httpService: HttpService) {}
  async getAllDisease(countries: string) {
    const url = `https://disease.sh/v3/covid-19/countries/${countries}`;
    const diseaseResponse = this.httpService.get(url).pipe(
      map((res) =>
        res.data.map((res) => {
          const country = res.country;
          const todayCases = res.todayCases;
          const todayDeaths = res.totalDeaths;
          const active = res.active;
          const critical = res.critical;
          return {
            country: country,
            todayCases: todayCases,
            todayDeaths: todayDeaths,
            active: active,
            critical: critical,
          };
        }),
      ),
    );
    const data = lastValueFrom(diseaseResponse);
    return data;
  }
}
