import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaComunComponent } from './area-comun.component';

describe('AreaComunComponent', () => {
  let component: AreaComunComponent;
  let fixture: ComponentFixture<AreaComunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaComunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaComunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
