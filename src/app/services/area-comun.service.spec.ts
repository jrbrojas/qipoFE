import { TestBed } from '@angular/core/testing';

import { AreaComunService } from './area-comun.service';

describe('AreaComunService', () => {
  let service: AreaComunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaComunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
