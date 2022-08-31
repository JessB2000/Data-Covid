/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
dotenv.config({path:'../.env'}); 
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'FormData'; 

const token = process.env.FORMDATA_TOKEN; 
//const file_id =process.env.ID;
@Injectable()
export class GoFileService{
  static httpService = new HttpService();
  constructor(private readonly httpService: HttpService) {}
  static async getGoFileServer() {
    const url = `https://api.gofile.io/getServer`
    const goFileResponse = this.httpService.axiosRef.get(url);
    const data = (await goFileResponse).data.data.server; 
    return data; 
  }
  static async makeFormData(filename:string){
    const formData = new FormData(); 
    formData.append('token', token); 
    formData.append('filename', filename); 

    return formData;
  }
  static async uploadFormData(filename: string){
    const server = await this.getGoFileServer();
    const urlApi = `https://${server}.gofile.io/uploadFile`;

    const formData = this.makeFormData(filename); 
    const response = await this.httpService.axiosRef.post(urlApi, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
    const data = response.data.data; 
    return data; 
  }
  
}