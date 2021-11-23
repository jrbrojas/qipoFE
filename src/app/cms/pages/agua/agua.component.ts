import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Agua } from 'src/app/models/agua.model';
import { Idx } from 'src/app/models/idx.model';
import { AguaService } from 'src/app/services/agua.service';

@Component({
  selector: 'app-agua',
  templateUrl: './agua.component.html',
  styleUrls: ['./agua.component.css']
})
export class AguaComponent implements OnInit {

  aguas : Agua[] = [];

  nameExcel : string = 'agua';

  templeteLink : string = 'http://localhost:8080/upload/quipo-unidad-inmobiliaria.xlsx';
  
  constructor(private aguaservice: AguaService) { }

  ngOnInit(): void {
    this.getAllAguas();
  }

  async getAllAguas(){
    this.aguas = await lastValueFrom(this.aguaservice.findAll());
  }

  async addData($event: Agua[]){
    const ids = this.aguas.map((data) => data.id);
    const idx: Idx = {idx : ids};
    console.log(idx);
    if (ids.length > 0){
      await lastValueFrom(this.aguaservice.deleteAll(idx));
    }

    for (const item of $event) {
      await lastValueFrom(this.aguaservice.save(item));
    }

    await this.getAllAguas();

  }

}
