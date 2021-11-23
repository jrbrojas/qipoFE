import { TestBed } from '@angular/core/testing';

import { CrudCommonService } from './crud-common.service';

describe('CrudCommonService', () => {
  let service: CrudCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
