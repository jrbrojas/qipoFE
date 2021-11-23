import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaDocComponent } from './carga-doc.component';

describe('CargaDocComponent', () => {
  let component: CargaDocComponent;
  let fixture: ComponentFixture<CargaDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
