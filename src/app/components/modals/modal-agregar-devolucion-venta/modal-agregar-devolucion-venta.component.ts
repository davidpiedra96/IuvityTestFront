import { RequestDevolucionVenta } from './../../../interface/kardexInterface';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { KardexService } from 'src/app/services/kardexService/kardexService.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modal-agregar-devolucion-venta',
  templateUrl: './modal-agregar-devolucion-venta.component.html',
  styleUrls: ['./modal-agregar-devolucion-venta.component.css'],
  providers: [KardexService],
})
export class ModalAgregarDevolucionVentaComponent {
  // Variables
  formDevVenta!: FormGroup;
  fechaMax!: string;
  fechaMin!: string;
  formatA = 'yyyy-MM-dd';
  formatB = 'dd/MM/yyyy';

  constructor(
    private readonly fb: FormBuilder,
    private cookies: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private kardexService: KardexService,
    private toastr: ToastrService
  ) {}

  // Métodos
  ngOnInit() {
    this.formDevVenta = this.initForm();
  }

  /**
   * Método onSubmit del form
   */
  onSubmit() {
    let request: RequestDevolucionVenta;
    let token = this.getToken();

    // Se valida que el formulario sea valido
    if (this.formDevVenta.status === 'VALID') {
      // Se crea el request para el consumo
      request = {
        codigo_producto: String(this.getCodigoProducto()),
        fecha: this.getFechaFormat(
          this.formDevVenta.value.fechaDevVenta,
          this.formatB
        ),
        descripcion: this.formDevVenta.value.descripcion,
        salida_cant: this.formDevVenta.value.salida_cant,
        codigo_factura_venta: this.formDevVenta.value.codigo_factura_venta,
      };

      console.log(request);
      /* this.kardexService.devolucionCompraProducto(token, request).subscribe(
        (resp: any) => {
          this.toastr.success('Devolución insertada correctamente', '');
        },
        (error) => {
          this.toastr.error(
            'La Devolución no pudo ser insertada, intentelo de nuevo',
            ''
          );
        }
      ); */
    }
  }

  /**
   * Método que inicializa el formulario
   * @returns FormGroup
   */
  initForm(): FormGroup {
    return this.fb.group({
      fechaDevVenta: ['2023-04-04', [Validators.required]],
      descripcion: [
        '',
        [Validators.required, Validators.min(6), Validators.max(50)],
      ],
      salida_cant: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      codigo_factura_venta: ['', [Validators.required]],
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
  getFechaFormat(fecha: string, format: string): string {
    const locale = 'en-US';
    return formatDate(fecha, format, locale);
  }
}
