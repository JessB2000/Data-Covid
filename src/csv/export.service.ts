/* eslint-disable prettier/prettier */
import * as json2csv from 'json2csv';
import * as uuid  from 'uuid';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

  const fields = ['country', 'todayCases', 'todayDeaths','date' ,'active' , 'critical']
  const opts = {fields};
@Injectable()
  export class ExportFiles {
 static async tocsv (dado): Promise<any> { 
  console.log(dado); 
      try{
        const csv = await json2csv.parseAsync(dado, opts)
        console.log(csv); 
        const filename = uuid.v4()+".csv"; 
        fs.writeFile('./src/filescsv/' + filename, csv, function(err){
          if (err) throw err; 
          console.log('Arquivo criado com sucesso')
        })
        return filename; 
      }
      catch(error){
       console.log (error); 
      }
    }
  }
 
  


