import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Idx } from 'src/app/models/idx.model';
import { Personal } from 'src/app/models/personal.model';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  personales : Personal[] = [];

  nameExcel : string = 'personal';

  templeteLink : string = 'http://localhost:8080/upload/quipo-unidad-inmobiliaria.xlsx';
  
  constructor(private propietarioService: PersonalService) { }

  ngOnInit(): void {
    this.getAllPersonal();
  }

  async getAllPersonal(){
    this.personales = await lastValueFrom(this.propietarioService.findAll());
  }

  async addData($event: Personal[]){
    const ids = this.personales.map((data) => data.id);
    const idx: Idx = {idx : ids};
    if (ids.length > 0){
      await lastValueFrom(this.propietarioService.deleteAll(idx));
    }

    for (const item of $event) {
      await lastValueFrom(this.propietarioService.save(item));
    }

    await this.getAllPersonal();

  }
}
