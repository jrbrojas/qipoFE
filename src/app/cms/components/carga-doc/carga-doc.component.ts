import { Component, Input, OnInit, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { Agua } from 'src/app/models/agua.model';
import { Mantenimiento } from 'src/app/models/mantenimiento.model';
import { Personal } from 'src/app/models/personal.model';
import { Propietario } from 'src/app/models/propietario.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { UnidadInmobiliaria } from 'src/app/models/unidad-inmobiliaria.model';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-carga-doc',
  templateUrl: './carga-doc.component.html',
  styleUrls: ['./carga-doc.component.css']
})
export class CargaDocComponent implements OnInit {

  @Input() openDowload: string = '';  
  @Input() tipoExcel: string = '';

  @Output() listExcel = new EventEmitter<any[]>();

  private  nameExcel : string[] = ['mantenimiento', 'servicio', 'propietario', 'personal', 'proveedor', 'agua', 'unidadInmobiliaria'];

  constructor(private filesService : FilesService) { }

  ngOnInit(): void {
  }

  public downloadFile(){
    if (this.openDowload){
      window.open(this.openDowload, "_blank");
    }
  }

  public async addFile(event : Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    let  arrayList: any[] = [];
    if (file && this.nameExcel.includes(this.tipoExcel)) {
      await this.filesService.readFileExcel(file).then(async (data :any) => {
        const dataList : any[] = data;

        let keyFlat: boolean = false; //ACTIVE => NO PROCESS

        const keys = (dataList[0]);
        let keysExcel: any = [];
        if (this.tipoExcel === 'unidadInmobiliaria'){
          keysExcel = ['tipo', 'grupo', 'unidad', 'area techada (m2)', 'area ocupada (m2)',
                               'TIPO', 'GRUPO', 'UNIDAD', 'AREA TECHADA (m2)', 'AREA OCUPADA (m2)']
        }
        
        for (const key of keysExcel){
          if (!keys.hasOwnProperty(key)){
            keyFlat = true;
          }else{
            keyFlat = false;
          }
        }

        if(!keyFlat){
          for (const item of dataList) {
          
            if (this.tipoExcel === 'unidadInmobiliaria'){
                               
              let unidadUi : UnidadInmobiliaria = {
                id: -1,
                idproyecto : -1,
                tipo: (item['tipo']) ? item['tipo'] : item['TIPO'],
                subtipo: '',
                grupo: (item['grupo']) ? item['grupo'] : item['GRUPO'],
                unidad: (item['unidad']) ? item['unidad'] : item['UNIDAD'],
                areaTechada: (item['area techada (m2)']) ? item['area techada (m2)'] : item['AREA TECHADA (m2)'],
                areaOcupada: (item['area ocupada (m2)']) ? item['area ocupada (m2)'] : item['AREA OCUPADA (m2)'],
                alicuota  : 0,
                ui: '',
                usuario : -1,
              };
              arrayList.push(unidadUi);
            }
  
            if (this.tipoExcel === 'mantenimiento') {
              let mantenimiento : Mantenimiento = {
                id: -1,
                idproyecto : -1,
                nombre: (item['nombre']) ? item['nombre'] : item['NOMBRE'],
                monto : (item['monto']) ? item['monto'] : item['MONTO'],
                idCon: -1,
                usuario : -1,
              };
              arrayList.push(mantenimiento);
            }
  
            if (this.tipoExcel === 'propietario') {
              let propietario : Propietario = {
                id: -1,
                dni : (item['dni']) ? item['dni'] : item['DNI'],
                nombre: (item['nombre']) ? item['nombre'] : item['NOMBRE'],
                apellido : (item['apellido']) ? item['apellido'] : item['APELLIDO'],
                correo : (item['correo']) ? item['correo'] : item['CORREO'],
                celular : (item['celular']) ? item['celular'] : item['CELULAR'],
                alquilado : false,
                placaUno :'',
                placaDos : '',
                mascota: '',
                usuario : -1
              };
              arrayList.push(propietario);
            }
  
            if (this.tipoExcel === 'personal') {
              let personal : Personal = {
                id: -1,
                idproyecto : -1,
                idmoneda :'',
                idCon : -1,
                nombre: (item['nombre']) ? item['nombre'] : item['NOMBRE'],
                apellido : (item['apellido']) ? item['apellido'] : item['APELLIDO'],
                actividad : (item['actividad']) ? item['actividad'] : item['ACTIVIDAD'],
                celular : (item['celular']) ? item['celular'] : item['CELULAR'],
                sueldo : (item['sueldo']) ? item['sueldo'] : item['SUELDO'],
                usuario : -1
              };
              arrayList.push(personal);
            }
  
            if (this.tipoExcel === 'proveedor') {
              let proveedor : Proveedor = {
                id: -1,
                idproyecto : -1,
                idmoneda :'',
                ruc :(item['ruc']) ? item['ruc'] : item['RUC'],
                contacto: (item['contacto']) ? item['contacto'] : item['CONTACTO'],
                razonSocial : (item['razon social']) ? item['razon social'] : item['RAZON SOCIAL'],
                celular : (item['celular']) ? item['celular'] : item['CELULAR'],
                correo : (item['correo']) ? item['correo'] : item['CORREO'],
                usuario : -1
              };
              arrayList.push(proveedor);
            }
  
            console.log(item);
            if (this.tipoExcel === 'agua') {
              let agua : Agua = {
                id: -1,
                idui: -2,
                lecturaAntes : Number((item['lectura anterior']) ? item['lectura anterior'] : item['LECTURA ANTERIOR']),
                lecturaActual : Number((item['lectura actual']) ? item['lectura actual'] : item['LECTURA ACTUAL']),
                consumo : Number((item['consumo %']) ? item['consumo %'] : item['CONSUMO %']),
                montoRecib : Number((item['monto total recibo']) ? item['monto total recibo'] : item['MONTO TOTAL RECIBO']),
                usuario : -1
              };
              arrayList.push(agua);
            }
  
          }
        }
        this.listExcel.emit(arrayList);
      }).catch ((err) => {
        console.log('No cargo de manera correcta el excel');
        this.listExcel.emit([]);
      });
    }else{
      this.listExcel.emit(arrayList);
    }
  }

}
