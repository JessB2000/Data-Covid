/* eslint-disable prettier/prettier */
import * as json2csv from 'json2csv';
import * as uuid  from 'uuid';
import * as fs from 'fs';
import { DiseaseData } from 'src/interface/disease';

  const fields = ['country', 'totalCases', 'totalDeaths','date' ,'active' , 'critical']
  const opts = {fields};

  export class ExportFiles {
    tocsv = async function (dado: DiseaseData){
      try{
        const csv = json2csv.parseAsync(dado, opts)
        const filename = uuid.v4()+".csv"; 
        fs.writeFile('../exports/' + filename, csv, function(err){
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
  


