import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarVentaComponent } from './modal-agregar-venta.component';

describe('ModalAgregarVentaComponent', () => {
  let component: ModalAgregarVentaComponent;
  let fixture: ComponentFixture<ModalAgregarVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
