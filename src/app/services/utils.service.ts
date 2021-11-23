import { Injectable } from '@angular/core';
import { DataApp } from '../models/auth.model';
import { Errores } from '../models/error.model';
import { User } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public readonly nameStoreUser : string = 'currentUser';

  public readonly nameStoreApp  : string = 'currentApp';

  constructor() { }

  public templateErrors(errors : Errores[]) : string{
   
    let errHtml = `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
                    Filas de Excel observadas
                    <span class="badge badge-danger badge-pill">#</span>
                  </li>`;
    errors.forEach(element => {
    errHtml  += `<li class="list-group-item d-flex justify-content-between align-items-center">
          ${element.message}
          <span class="badge badge-primary badge-pill">${element.idx}</span>
      </li>`;
    });

    return `<ul class="list-group">${errHtml}</ul>`;
  }

  public createDataStore(name: string, param : any){
    localStorage.setItem(name, JSON.stringify(param));
  }

  public getDataStore(name: string ){
    const local: string = localStorage.getItem(name)!;
    let data =  JSON.parse(local);
    //console.log(data);
    if(data){
      return data;
    }
    return '';
  }

  public deleteDataSore(name: string){
    localStorage.removeItem(name);
  }

  public getByIdProyectoMoneda(): DataApp{
    const dataApp: DataApp = this.getDataStore(this.nameStoreApp);
    return dataApp;
  }

  public getByIdUsuario(): number {
    const usuario : User  = this.getDataStore(this.nameStoreUser);
    const idUsuario = Number(usuario.id);
    if (idUsuario > 0){
      return idUsuario;
    }
    return -1;
  }

}
