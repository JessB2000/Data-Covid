/* eslint-disable prettier/prettier */
import * as json2csv from 'json2csv';
import * as uuid  from 'uuid';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { GoFileService } from 'src/goFile/goFile.service';
import { GoFilePath } from 'src/goFile/interface';

  const fields = ['country', 'todayCases', 'todayDeaths','date' ,'active' , 'critical']
  const opts = {fields};
@Injectable()
  export class ExportFiles {
 static async tocsv (dado): Promise<GoFilePath> { 
  console.log(dado); 
      try{
        const csv = await json2csv.parseAsync(dado, opts)
        console.log(csv); 
        const filename = uuid.v4()+".csv"; 
        const file = `./src/filescsv/${filename}`
        fs.writeFile(file, csv, function(err){
          if (err) throw err; 
          console.log('Arquivo criado com sucesso')
        })
        //const value = GoFileService.uploadFormData(filename); 
        return {name: filename, path: file}; 
      }
      catch(error){
       console.log (error); 
      }
    }
  }
 
  


