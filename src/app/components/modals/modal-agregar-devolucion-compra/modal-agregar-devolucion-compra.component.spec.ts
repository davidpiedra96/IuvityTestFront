import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarDevolucionCompraComponent } from './modal-agregar-devolucion-compra.component';

describe('ModalAgregarDevolucionCompraComponent', () => {
  let component: ModalAgregarDevolucionCompraComponent;
  let fixture: ComponentFixture<ModalAgregarDevolucionCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarDevolucionCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarDevolucionCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
