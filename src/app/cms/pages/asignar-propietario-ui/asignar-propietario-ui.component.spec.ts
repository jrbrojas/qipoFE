import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPropietarioUiComponent } from './asignar-propietario-ui.component';

describe('AsignarPropietarioUiComponent', () => {
  let component: AsignarPropietarioUiComponent;
  let fixture: ComponentFixture<AsignarPropietarioUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPropietarioUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPropietarioUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
