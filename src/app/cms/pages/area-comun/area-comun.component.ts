import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AreaComun } from 'src/app/models/area-comun.model';
import { FileRta } from 'src/app/models/files.model';
import { AreaComunService } from 'src/app/services/area-comun.service';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-area-comun',
  templateUrl: './area-comun.component.html',
  styleUrls: ['./area-comun.component.css']
})
export class AreaComunComponent implements OnInit {

  //https://github.com/SheetJS/sheetjs/tree/master/demos/angular

  areasComunes : AreaComun[] = [];
  
  constructor(private areaComunService: AreaComunService,
              private filesService : FilesService) { }

  ngOnInit(): void {
    this.getAllAreaComun();
  }

  public downloadFile(){
    console.log('file download');
    //this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    /*this.filesService.getFile('quipo-area-comun.xlsx', 'http://localhost:8080/upload/quipo-area-comun.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    .subscribe()*/
    window.open('http://localhost:8080/upload/quipo-area-comun.xlsx', "_blank");
  }

  public async onUpload(id : number,event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file && id > 0) {

      const fileRta : FileRta =  await lastValueFrom(this.filesService.uploadFile(file));
      console.log(fileRta);
      const areaComun: AreaComun = await lastValueFrom(this.areaComunService.getById(id));
      areaComun.ruta = fileRta.filename;
      console.log(areaComun);
      this.areaComunService.update(areaComun).subscribe((data)=>{
        console.log('update', data);
      });
    }
  }

  async getAllAreaComun(){
    this.areasComunes = await lastValueFrom(this.areaComunService.getAll());
    console.log('completo carga');
  }

  async addAreaComun(event : Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    let objA : AreaComun;
    //eliminar registro
    const ids = this.areasComunes.map((data) => data.id);
    console.log(ids);
    if (ids.length > 0){
      const data = await lastValueFrom(this.areaComunService.deleteAll(ids));
      console.log('delete',data);  
    }
    console.log('paso delete');
    await this.filesService.readFileExcel(file).then(async (data :any) => {
      this.areasComunes = [];
      for (const item of data) {
        objA = {
          id : -1,
          idproyecto :-1,
          nombre : item['NOMBRE'],
          descripcion : item['DESCRIPCION'],
          ruta    : '',
          usuario : -1
        }
        const obj = await lastValueFrom(this.areaComunService.create(objA));
      console.log('completo creacion',obj);
      }
      console.log('completo carga');
    }).catch ((err) => {
      console.log('No cargo de manera correcta el excel');
    });

    console.log('ultimo');
    await this.getAllAreaComun();
    console.log('ultimo fin');
  }

}
