import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Idx } from 'src/app/models/idx.model';
import { Servicio } from 'src/app/models/servicio.model';
import { FilesService } from 'src/app/services/files.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicios : Servicio[] = [];
  
  constructor(private servicioService: ServicioService,
              private filesService : FilesService) { }

  ngOnInit(): void {
    this.getAllServicios();
  }

  public downloadFile(){
    window.open('http://localhost:8080/upload/quipo-unidad-inmobiliaria.xlsx', "_blank");
  }

  public onUpload(id : number,event: Event) {
    
  }

  async getAllServicios(){
    this.servicios = await lastValueFrom(this.servicioService.findAll());
  }

  async addServicios(event : Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    let servicio : Servicio;

    const ids = this.servicios.map((data) => data.id);
    const idx: Idx = {idx : ids};
    if (ids.length > 0){
      await lastValueFrom(this.servicioService.deleteAll(idx));
    }
    await this.filesService.readFileExcel(file).then(async (data :any) => {
      this.servicios = [];
      console.log(data);
      for (const item of data) {
        servicio = {
                    id: -1,
                    idproyecto : -1,
                    nombre: item['NOMBRE'],
                    monto : item['MONTO'],
                    nidCon: -1,
                    usuario : -1,
                   }
        await lastValueFrom(this.servicioService.save(item));
      }
    }).catch ((err) => {
      console.log('No cargo de manera correcta el excel');
    });

    await this.getAllServicios();
  }

}
