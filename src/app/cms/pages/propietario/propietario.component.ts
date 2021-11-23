import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Idx } from 'src/app/models/idx.model';
import { Propietario } from 'src/app/models/propietario.model';
import { PropietarioService } from 'src/app/services/propietario.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {

  propietarios : Propietario[] = [];

  nameExcel : string = 'propietario';

  templeteLink : string = 'http://localhost:8080/upload/quipo-unidad-inmobiliaria.xlsx';
  
  constructor(private propietarioService: PropietarioService, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getAllPropietarios();
  }

  async getAllPropietarios(){
    this.propietarios = await lastValueFrom(this.propietarioService.findAll());

    /*this.utilsService.filterTable('jose',this.propietarios).then((data) => {
      console.log(data);
    });*/
  }

  async addData($event: Propietario[]){
  
    let alert: boolean  = (this.propietarios.length > 0)? false : true;

    if ((this.propietarios.length > 0)) {
      await Swal.fire({
              title: '¿Usted está seguro de realizar esta operación?',
              text: "La información registrada contiene información adicional dependiente. Si va continuar con el proceso de carga, la información registrada anteriormente y sus dependencias se eliminará. De no estar seguro comuníquese con el área de soporte.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                alert = true;
              }else{
                alert = false;
              }
            })
    }

    if (alert) {
      const ids = this.propietarios.map((data) => data.id);
      const idx: Idx = {idx : ids};
      if (ids.length > 0){
        await lastValueFrom(this.propietarioService.deleteAll(idx));
      }
  
      for (const item of $event) {
        await lastValueFrom(this.propietarioService.save(item));
      }
  
      await this.getAllPropietarios();
    }

  }

}
