import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Idx } from '../models/idx.model';
import { UnidadInmobiliaria } from '../models/unidad-inmobiliaria.model';
import { CrudCommonService } from './crud-common.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadInmobiliariaService extends CrudCommonService<UnidadInmobiliaria, number>{

  constructor(protected http: HttpClient) {
    super(http);
  }
  
  getResourceUrl(): string {
    return   '/api/unidad-inmobiliaria';
  }
  
  deleteAll(idx: Idx): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}${this.getResourceUrl()}/delete`, idx);
  }
}