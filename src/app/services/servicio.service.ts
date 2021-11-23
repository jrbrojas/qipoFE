import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Idx } from '../models/idx.model';
import { Servicio } from '../models/servicio.model';
import { CrudCommonService } from './crud-common.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService extends CrudCommonService<Servicio, number>{

  private readonly _api : string = '/api/servicios';

  constructor(protected http: HttpClient) {
    super(http);
  }
  getResourceUrl(): string {
    return this._api;
  }

  deleteAll(idx: Idx): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}${this._api}/delete`, idx);
  }

}
