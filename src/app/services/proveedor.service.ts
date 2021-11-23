import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Idx } from '../models/idx.model';
import { Proveedor } from '../models/proveedor.model';
import { CrudCommonService } from './crud-common.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService extends CrudCommonService<Proveedor, number>{

  constructor(protected http: HttpClient) {
    super(http);
  }
  
  getResourceUrl(): string {
    return   '/api/proveedor';
  }
  
  deleteAll(idx: Idx): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}${this.getResourceUrl()}/delete`, idx);
  }
}