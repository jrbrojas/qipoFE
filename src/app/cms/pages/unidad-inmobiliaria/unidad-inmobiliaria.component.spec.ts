import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadInmobiliariaComponent } from './unidad-inmobiliaria.component';

describe('UnidadInmobiliariaComponent', () => {
  let component: UnidadInmobiliariaComponent;
  let fixture: ComponentFixture<UnidadInmobiliariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadInmobiliariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadInmobiliariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
