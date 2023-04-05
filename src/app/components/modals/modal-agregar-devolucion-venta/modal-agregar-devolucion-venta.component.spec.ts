import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDevolucionVentaComponent } from './modal-agregar-devolucion-venta.component';

describe('ModalAgregarDevolucionVentaComponent', () => {
  let component: ModalAgregarDevolucionVentaComponent;
  let fixture: ComponentFixture<ModalAgregarDevolucionVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarDevolucionVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarDevolucionVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
