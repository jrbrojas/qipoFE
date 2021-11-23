import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto.model';
import { CrudCommonService } from './crud-common.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService extends CrudCommonService<Proyecto, number>{

  constructor(protected http: HttpClient) {
    super(http);
  }
  
  getResourceUrl(): string {
    return   '/api/proyectos';
  }
  
}