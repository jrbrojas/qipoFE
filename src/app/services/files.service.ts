import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';

import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { FileRta } from '../models/files.model';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = `${environment.API_URL}/upload`;

  constructor(private http: HttpClient) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type});
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob): Observable<FileRta> {
    const dto = new FormData();
    dto.append('file', file);
    console.log('filess:',dto.get('file'));
    return this.http.post<FileRta>(`${this.apiUrl}`, dto)
  }

  readFileExcel(file : File | any){
    let fileList : any;
    return new Promise((resolve, reject) => {
      if (file) {
        let arrayBuffer : any;
        let fileReader = new FileReader();    
        fileReader.readAsArrayBuffer(file);  
        fileReader.onload = (e) => {    
            arrayBuffer = fileReader.result;    
            var data = new Uint8Array(arrayBuffer);    
            var arr = new Array();    
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
            var bstr = arr.join(""); 
            var workbook = XLSX.read(bstr, {type:"binary"});    
            var first_sheet_name = workbook.SheetNames[0];    
            var worksheet = workbook.Sheets[first_sheet_name];    
            //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
            fileList = XLSX.utils.sheet_to_json(worksheet, { raw: true });
            
            resolve(fileList);
        }
        fileReader.onerror = reject;
      }
    });  
  }
}
