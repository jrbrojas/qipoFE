import { Pipe, PipeTransform } from '@angular/core';
import { UnidadInmobiliaria } from 'src/app/models/unidad-inmobiliaria.model';

@Pipe({
  name: 'searchFilter'
})
export class FilterPipe implements PipeTransform {

  /*transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    let resultPosts = [];
    for (const post of value) {
        if (post.title.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
        };
    };
    return resultPosts;
  }*/

  transform(unidadInmobiliaria: UnidadInmobiliaria[], searchValue: string): UnidadInmobiliaria[] {
    if (!unidadInmobiliaria || !searchValue){
      return unidadInmobiliaria;
    }
    return unidadInmobiliaria.filter(data => 
      data.ui.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.grupo.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.tipo.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.unidad.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.alicuota.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
      data.areaOcupada.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
      data.areaTechada.toString().toLowerCase().includes(searchValue.toLowerCase())
    );
  }

}
