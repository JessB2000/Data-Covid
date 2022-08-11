/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
dotenv.config(); 
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'FormData'; 
import { lastValueFrom } from 'rxjs';

const id = process.env.FORMDATA_ID; 
const token = process.env.FORMDATA_TOKEN; 
@Injectable()
export class goFilePost {
  constructor(private readonly httpService: HttpService) {}
  async postGoFile(server) {
    const url = `https//${server}.gofile.io/uploadFile`;
    const bodyFormData = new FormData();
    bodyFormData.append('id', (`${id}`));
    bodyFormData.append('token', (`${token}`));
    
    const response = await this.httpService.post(url, bodyFormData, { headers: bodyFormData.getHeaders()})
    const data = lastValueFrom(response)
    return data; 
  }
}