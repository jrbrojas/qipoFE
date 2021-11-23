import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DataApp } from 'src/app/models/auth.model';
import { Moneda } from 'src/app/models/moneda.model';
import { Proyecto } from 'src/app/models/proyecto.model';
import { MonedaService } from 'src/app/services/moneda.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  proyectos : Proyecto[] = [];
  monedas : Moneda[] = [];
  flatMoneda : boolean = false;

  constructor(private proyectoService: ProyectoService,
              private monedaService : MonedaService,
              private utilService: UtilsService,
              private readonly locationStrategy: LocationStrategy
            ) 
  {
    this.pathDefault();
  }

  ngOnInit(): void {
    this.getAllProyectos();
    this.getAllMoneda();
  }

  public async getAllProyectos(){
    this.proyectos = await lastValueFrom(this.proyectoService.findAll());
  }

  public async getAllMoneda(){
    this.monedas = await lastValueFrom(this.monedaService.findAll());
  }

  private pathDefault(){
    const path = this.locationStrategy.path();
    if (path.includes('unidad-inmobiliaria')) {
      this.flatMoneda = true;
    }else{
      this.flatMoneda = false;
    }
  }

  public async selectProyecto(event: any){

    const select = event.target.value;
    console.log(select);
    if (Number(select) > 0){
      const proyect = await lastValueFrom(this.proyectoService.findOne(Number(select)));
      const dataApp: DataApp = {
        idProyecto : proyect.id,
        proyecto: proyect.descripcion
      }
      this.utilService.createDataStore(this.utilService.nameStoreApp, dataApp);
    }else{
      this.utilService.deleteDataSore(this.utilService.nameStoreApp);
    }
    
  }


}
