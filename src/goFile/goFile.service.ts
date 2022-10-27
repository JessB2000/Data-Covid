/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
dotenv.config({path:'../.env'}); 
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data'; 
import * as fs from 'fs'; 
import { GoFilePath} from './interface';
const token = process.env.FORMDATA_TOKEN; 
const id = process.env.FOLDER_ID;
@Injectable()
export class GoFileService{
  constructor(private readonly httpService: HttpService) {}
   async getGoFileServer() : Promise<string> {
    const url = `https://api.gofile.io/getServer`
    const goFileResponse = this.httpService.axiosRef.get(url);
    const data = (await goFileResponse).data.data.server; 
    return data; 
  }
  async makeFormData( filepath:string, filename: string){
    const formData = new FormData(); 
    formData.append('token', token); 
    formData.append('folderId', id);
    formData.append('file', fs.createReadStream(filepath),{
      filename:filename,
    }) 
    return formData;
  }
   async uploadFormData( fileOne: GoFilePath, fileTwo: GoFilePath ){
    const server = await this.getGoFileServer();
    const urlApi = `https://${server}.gofile.io/uploadFile`;

    const oneFormData = this.makeFormData(fileOne.path, fileOne.name);
    const twoFormData = this.makeFormData(fileTwo.path, fileTwo.name);
    const oneResponse = await this.httpService.axiosRef.post(urlApi, oneFormData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
    const oneData = await oneResponse.data; 
    const twoResponse = await this.httpService.axiosRef.post(urlApi, twoFormData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
    const twoData = await twoResponse.data; 
    return {oneData, twoData}; 
  }
  async removeFile(filepath: string) {
    return fs.rm(filepath, (err) => {
      if (err) throw new Error('Arquivo não removido');
    });
  }
}