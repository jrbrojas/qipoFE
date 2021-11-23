import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Idx } from 'src/app/models/idx.model';
import { Mantenimiento } from 'src/app/models/mantenimiento.model';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  mantenimientos : Mantenimiento[] = [];

  nameExcel : string = 'mantenimiento';

  templeteLink : string = 'http://localhost:8080/upload/quipo-unidad-inmobiliaria.xlsx';
  
  constructor(private mantenimientoService: MantenimientoService) { }

  ngOnInit(): void {
    this.getAllMantenimientos();
  }

  async getAllMantenimientos(){
    this.mantenimientos = await lastValueFrom(this.mantenimientoService.findAll());
  }

  async addData($event: Mantenimiento[]){

    const ids = this.mantenimientos.map((data) => data.id);
    const idx: Idx = {idx : ids};
    console.log(idx);
    if (ids.length > 0){
      await lastValueFrom(this.mantenimientoService.deleteAll(idx));
    }

    for (const item of $event) {
      console.log(item);
      await lastValueFrom(this.mantenimientoService.save(item));
    }

    await this.getAllMantenimientos();

  }
}
