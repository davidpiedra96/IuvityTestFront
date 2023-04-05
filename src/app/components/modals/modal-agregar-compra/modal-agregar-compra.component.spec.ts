import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarCompraComponent } from './modal-agregar-compra.component';

describe('ModalAgregarCompraComponent', () => {
  let component: ModalAgregarCompraComponent;
  let fixture: ComponentFixture<ModalAgregarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAgregarCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAgregarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
