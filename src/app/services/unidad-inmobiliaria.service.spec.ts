import { TestBed } from '@angular/core/testing';

import { UnidadInmobiliariaService } from './unidad-inmobiliaria.service';

describe('UnidadInmobiliariaService', () => {
  let service: UnidadInmobiliariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadInmobiliariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
