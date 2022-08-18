/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
dotenv.config(); 
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'FormData'; 

const token = process.env.FORMDATA_TOKEN; 
@Injectable()
export class GoFileService{
  constructor(private readonly httpService: HttpService) {}
  async getGoFileServer() {
    const url = `https://api.gofile.io/getServer`
    const goFileResponse = this.httpService.axiosRef.get(url);
    const data = (await goFileResponse).data.data.server; 
    return data; 
  }
  async makeFormData(filename:string, file_id: string ): FormData {
    const formData = new FormData(); 
    formData.append('token', token); 
    formData.append('folderId', file_id);
    formData.append('filename', filename); 

    return formData;
  }
  async uploadFormData(filename: string, file_id:string){
    const server = await this.getGoFileServer();
    const urlApi = `https://${server}.gofile.io/uploadFile`;

    const formData = this.makeFormData(filename, file_id); 
    const response = await this.httpService.axiosRef.post(urlApi, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
    const data = response.data.data; 
    return data; 
  }
}