import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RequestIngresarCompraProducto } from 'src/app/interface/kardexInterface';
import { Proveedor } from 'src/app/interface/proveedorInterface';
import { ProveedorService } from 'src/app/services/proveedorService/proveedor-service.service';
import { KardexService } from 'src/app/services/kardexService/kardexService.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modal-agregar-compra',
  templateUrl: './modal-agregar-compra.component.html',
  styleUrls: ['./modal-agregar-compra.component.css'],
  providers: [ProveedorService, KardexService],
})
export class ModalAgregarCompraComponent {
  // Variables
  formAgregarCompra!: FormGroup;
  fechaMax!: string;
  fechaMin!: string;
  formatA = 'yyyy-MM-dd';
  formatB = 'dd/MM/yyyy';

  // Constructor
  constructor(
    private readonly fb: FormBuilder,
    private cookies: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private proveedorService: ProveedorService,
    private kardexService: KardexService,
    private toastr: ToastrService
  ) {}

  // Métodos
  ngOnInit() {
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();
    let dia = new Date().getDate();
    let fecMax = anio + '-' + mes + '-' + dia;
    let fecMin = anio + '-' + mes + '-' + 1;

    this.fechaMax = this.getFechaFormat(fecMax, this.formatA);
    this.fechaMin = this.getFechaFormat(fecMin,this.formatA);
    this.formAgregarCompra = this.initForm();
  }

  /**
   * Método onSubmit del form
   */
  onSubmit() {
    console.log(this.formAgregarCompra.value);
    let request: RequestIngresarCompraProducto;
    let proveedor: Proveedor;
    let token = this.getToken();
    if (this.formAgregarCompra.status === 'VALID') {
      // Consulta el código del proveedor
      console.log(token, this.formAgregarCompra.value.nit_proveedor);
      this.proveedorService
        .obtenerProveedorPorCodigo(token, this.formAgregarCompra.value.nit_proveedor)
        .subscribe(
          (resp: any) => {
            proveedor = resp;
            // Se crea el request para el consumo
            request = {
              codigo_producto: String(this.getCodigoProducto()),
              fecha: this.getFechaFormat(this.formAgregarCompra.value.fechaCompra, this.formatB),
              descripcion: this.formAgregarCompra.value.descripcion,
              entrada_cant: this.formAgregarCompra.value.entrada_cant,
              entrada_valor: this.formAgregarCompra.value.entrada_valor,
              codigo_proveedor: String(proveedor.codigo)
            };
            console.log(request);
            // Se consume el servicio de agregar compra producto
            this.kardexService.ingresarCompraProducto(token,request).subscribe(
              (resp: any) => {
                this.toastr.success('Compra agregada correctamente', '');
              },
              (error) => {
                this.toastr.error('La Factura de compra no pudo ser insertada, intentelo de nuevo', '');
              }
            );

          },
          (error) => {
            console.log(error);
          }
        );


    }
  }

  /**
   * Método que inicializa el formulario
   * @returns FormGroup
   */
  initForm(): FormGroup {
    return this.fb.group({
      fechaCompra: ['2023-04-04', [Validators.required]],
      descripcion: [
        '',
        [Validators.required, Validators.min(6), Validators.max(50)],
      ],
      entrada_cant: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      entrada_valor: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      nit_proveedor: ['', [Validators.required]],
    });
  }

  /**
   * Método que obtiene el token de las cookies
   * @returns string
   */
  getToken(): string {
    let token: string;
    return (token = this.cookies.get('token'));
  }

  /**
   * Método que retorna el codigo del producto de la url
   * @returns number
   */
  getCodigoProducto(): number {
    let id: number = 0;
    try {
      id = Number(this.activatedRoute.snapshot.params['id']);
      if (!id) {
        this.router.navigate(['productos/']);
      }
    } catch (error) {
      console.log(error);
      this.router.navigate(['productos']);
    }
    return id;
  }

  /**
   * Método que devuelve la fecha en el formato indicado
   * @param fecha
   * @param format
   * @returns string
   */
  getFechaFormat(fecha: string, format: string):string{
    const locale = 'en-US';
    return formatDate(fecha, format, locale);
  }
}
