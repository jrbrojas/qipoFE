import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Errores } from 'src/app/models/error.model';
import { Idx } from 'src/app/models/idx.model';
import { UnidadInmobiliaria } from 'src/app/models/unidad-inmobiliaria.model';
import { UnidadInmobiliariaService } from 'src/app/services/unidad-inmobiliaria.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidad-inmobiliaria',
  templateUrl: './unidad-inmobiliaria.component.html',
  styleUrls: ['./unidad-inmobiliaria.component.css']
})
export class UnidadInmobiliariaComponent implements OnInit {

  unidadInmobiliarias : UnidadInmobiliaria[] = [];
  unidadInmobiliariasTemp : UnidadInmobiliaria[] = [];

  nameExcel : string = 'unidadInmobiliaria';

  templeteLink : string = 'http://localhost:8080/upload/quipo-unidad-inmobiliaria.xlsx';
  
  errors : any[] = [];
  error  : boolean = false;

  cargando : boolean = false;
  filterSearch!: any;

  public page: number = 1; //Número de página en la que estamos. Será 1 la primera vez que se carga el componente

  public totalPages: number = 0; //Número total de páginas

  public numShops: number = 0; //Total de tiendas existentes

  private numResults: number = 5;
  
  constructor(private unidadInmobiliariaService: UnidadInmobiliariaService,
              private utilsService : UtilsService) { }

  ngOnInit(): void {
    this.filterSearch = '';
    this.getAllUnidadInmobiliaria();
  }


  async getAllUnidadInmobiliaria(){
    this.unidadInmobiliarias = await lastValueFrom(this.unidadInmobiliariaService.findAll());
    this.unidadInmobiliariasTemp = this.unidadInmobiliarias;
  }

  async addData($event: UnidadInmobiliaria[]){

    if($event.length == 0) {
      return;
    }

    const dataApp = this.utilsService.getByIdProyectoMoneda();
    const idDataProyecto = Number(dataApp.idProyecto);
    console.log(dataApp, idDataProyecto);
    if (!(idDataProyecto > 0) || !idDataProyecto){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        text: 'Seleccione un proyecto',
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }

    const idUsuario = this.utilsService.getByIdUsuario();
    console.log(idUsuario, 'users');

    this.unidadInmobiliarias = [];

    this.cargando = true;

    const ids = this.unidadInmobiliarias.map((data) => data.id);
    const idx: Idx = {idx : ids};
    if (ids.length > 0){
      await lastValueFrom(this.unidadInmobiliariaService.deleteAll(idx)).catch((e) => {
        this.error = true;
      });
    }

    let totalArea: number = 0;
    for(let i of $event) totalArea+=Number(i.areaTechada);
    
    let acomulador: number = 1;
    for (const item of $event) {
      item.idproyecto = idDataProyecto,
      item.usuario  = idUsuario,
      item.alicuota = Number((Number(item.areaTechada)/totalArea).toFixed(2));
      item.ui = `${item.tipo.slice(0,3)}-${item.grupo}-s${item.unidad}`;
      
      await lastValueFrom(this.unidadInmobiliariaService.save(item)).catch((e) => {
        console.log('Hubo error', e.error.errors)
        console.log('Hubo error', e.error.message)
        const err: Errores = {
          idx: acomulador,
          message :  e.error.message,
          err: e.error.errors
        };

        this.errors.push(err);
        this.error = true;
      });
      acomulador += 1;
    }

    if (this.error) {
      this.cargando = false;
      const htmlErr = this.utilsService.templateErrors(this.errors);

      await Swal.fire({
                      title: 'Error al registrar los datos cargados. Corregir!',
                      text: this.errors.toString(),
                      html: htmlErr
                    })
    }

    await this.getAllUnidadInmobiliaria();
    this.cargando = false;
  }

  public buscar(text: string){
    console.log(text);
    let filte = new FilterPipe();
    this.unidadInmobiliarias = filte.transform(this.unidadInmobiliariasTemp, text);
  }

   //Función para pasar de página

  //Esta función se ejecuta cada vez que se desencadena

  //un evento sobre el componente hijo (app-pagination)

  goToPage(page: number){

    this.page = page;

    this.getShopsByPage(page);

  }

  //Este método llama al servicio dónde se obtiene el listado de tiendas

  //Recibe una página concreta

  getShopsByPage(page: Number) {

    console.log(page);

    this.numShops = this.unidadInmobiliarias.length;

    this.totalPages = Math.round(this.numShops / this.numResults);

  }
}
