import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {


  @Input() public page: number = 0;

  @Input() public totalPages: number = 0;

  @Input() public numShops: number = 0;

  @Output() paginaEmitter: EventEmitter<number> =  new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  public siguiente(){
    this.page++;
    this.pasarPagina();
  }

  public anterior(){
    this.page--;
    this.pasarPagina();
  }

  public pasarPagina(){
    this.paginaEmitter.emit(this.page);
  }

}
