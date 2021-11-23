import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Idx } from '../models/idx.model';
import { Propietario } from '../models/propietario.model';
import { CrudCommonService } from './crud-common.service';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService extends CrudCommonService<Propietario, number>{

  constructor(protected http: HttpClient) {
    super(http);
  }
  
  getResourceUrl(): string {
    return   '/api/propietario';
  }
  
  deleteAll(idx: Idx): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}${this.getResourceUrl()}/delete`, idx);
  }
}