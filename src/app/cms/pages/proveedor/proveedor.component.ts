import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Idx } from 'src/app/models/idx.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  proveedores : Proveedor[] = [];

  nameExcel : string = 'proveedor';

  templeteLink : string = 'http://localhost:8080/upload/quipo-unidad-inmobiliaria.xlsx';
  
  constructor(private proveedoreservice: ProveedorService) { }

  ngOnInit(): void {
    this.getAllproveedores();
  }

  async getAllproveedores(){
    this.proveedores = await lastValueFrom(this.proveedoreservice.findAll());
  }

  async addData($event: Proveedor[]){
    const ids = this.proveedores.map((data) => data.id);
    const idx: Idx = {idx : ids};
    console.log(idx);
    if (ids.length > 0){
      await lastValueFrom(this.proveedoreservice.deleteAll(idx));
    }

    for (const item of $event) {
      await lastValueFrom(this.proveedoreservice.save(item));
    }

    await this.getAllproveedores();

  }

}
