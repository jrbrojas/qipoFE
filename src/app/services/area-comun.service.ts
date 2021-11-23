import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AreaComun, CreateAreaComunDTO } from '../models/area-comun.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaComunService {

  private apiUrl = `${environment.API_URL}/api/area-comunes`;

  constructor(private http: HttpClient) { }

  create(dto : CreateAreaComunDTO): Observable<AreaComun>
  {
    return this.http.post<AreaComun>(this.apiUrl, dto);
  }

  update(data : AreaComun) :Observable<any>{
    return this.http.put(this.apiUrl, data);
  }

  getAll(): Observable<AreaComun[]>
  {
    return this.http.get<AreaComun[]>(this.apiUrl);
  }

  getById(id : number) : Observable<AreaComun>{
    return this.http.get<AreaComun>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
  
  deleteAll(ids: number[]): Observable<any> {
    const idx = {'idx': ids};
    console.log(idx);
    return this.http.post<any>(`${this.apiUrl}/delete`, idx);
  }
}
