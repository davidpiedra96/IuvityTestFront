import { Component } from '@angular/core';
import { KardexService } from 'src/app/services/kardexService/kardexService.service';
import { ProductoService } from 'src/app/services/productoService/producto-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  lKardex,
  KardexInterface,
  RequestConsultarKardexProducto,
} from 'src/app/interface/kardexInterface';
import { ProductoInterface } from 'src/app/interface/productoInterface';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [KardexService, ProductoService],
})
export class ProductoComponent {
  // Variables
  token: String = '';
  requestConsultarKardexProducto: RequestConsultarKardexProducto = {
    mes: 0,
    anio: 0,
    codigo_producto: 0,
  };

  listaKardex: lKardex = [];
  itemKardex: KardexInterface = {
    indice: 0,
    codigo_producto: 0,
    fecha: '',
    descripcion: '',
    vlr_unitario: 0,
    entrada_cant: 0,
    entrada_valor: 0,
    salida_cant: 0,
    salida_valor: 0,
    saldo_cant: 0,
    saldo_valor: 0,
    codigo_factura_venta: undefined,
    codigo_factura_compra: undefined,
  };

  producto: ProductoInterface = {
    codigo: -1,
    nombre: '',
    referencia: '',
    unidad: '',
    vlr_unitario: 0,
    saldo_cant: 0,
  };

  mes: number;
  anio: number;
  codigo: number;

  /**
   * Constructor
   * @param kardexService
   * @param cookies
   * @param router
   */
  constructor(
    private kardexService: KardexService,
    private productoService: ProductoService,
    private cookies: CookieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Se obtiene mes y anio actual
    this.mes = new Date().getMonth() + 1;
    this.anio = new Date().getFullYear();

    // Se obtiene el codigo del producto de la url
    this.codigo = this.getCodigoProducto();

    // Se valida que el codigo de producto si exista

    this.getProducto();

    this.requestConsultarKardexProducto = {
      mes: this.mes,
      anio: this.anio,
      codigo_producto: this.codigo,
    };

    this.getKardexProducto(this.requestConsultarKardexProducto);
    /* console.log('1');
    console.log(this.listaKardex);
    console.log(this.mes);
    console.log(this.anio); */
  }

  // Métodos

  ngOnInit() {}

  /**
   * Método que devuelve el código del producto
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
   * Método que obtiene el Kardex del producto
   * @param request
   */
  getKardexProducto(request: RequestConsultarKardexProducto) {
    this.kardexService
      .consultaKardexMesAnio(
        this.getToken(),
        this.requestConsultarKardexProducto
      )
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.listaKardex = resp;
        },
        (error) => {
          this.router.navigate(['productos']);
        }
      );
  }

  /**
   * Obtiene el detalle del producto
   */
  getProducto() {
    this.productoService
      .obtenerProducto(this.getToken(), Number(this.codigo))
      .subscribe(
        (resp: any) => {
          this.producto = resp;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /**
   * Método que carga el kardex del mes anterior
   */
  cargarKardexMesAnterior() {
    if (this.mes === 1) {
      this.mes = 12;
      this.anio--;
    } else {
      this.mes--;
    }
    this.requestConsultarKardexProducto = {
      mes: this.mes,
      anio: this.anio,
      codigo_producto: Number(this.codigo),
    };

    this.getKardexProducto(this.requestConsultarKardexProducto);

  }

  /**
   * Método que carga el kardex del mes siguiente
   */
  cargarKardexMesSiguiente() {
    if (this.mes === 12) {
      this.mes = 1;
      this.anio++;
    } else {
      this.mes++;
    }
    this.requestConsultarKardexProducto = {
      mes: this.mes,
      anio: this.anio,
      codigo_producto: Number(this.codigo),
    };

    this.getKardexProducto(this.requestConsultarKardexProducto);
  }

  /**
   * Retorna el token de seguridad
   * @returns Token
   */
  getToken(): string {
    return (this.token = this.cookies.get('token'));
  }

  obtenerMes(): string {
    switch(this.mes){
      case 1: return 'Enero';
      case 2: return 'Febrero';
      case 3: return 'Marzo';
      case 4: return 'Abril';
      case 5: return 'Mayo';
      case 6: return 'Junio';
      case 7: return 'Julio';
      case 8: return 'Agosto';
      case 9: return 'Septiembre';
      case 10: return 'Octubre';
      case 11: return 'Noviembre';
      case 12: return 'Diciembre';

    }
    return '';
  }
}

// 0. Validar que el producto si exista, sino retorna a la venta /productos
// 1. Obtener la información del producto codigo, nombre, referencia, cantidad actual, valor unitario - listo
// 2. Obtener Kardex por mes -
// 3. El paginador debe estar configurado para obtener el mes anterior o mes siguiente dado el caso
