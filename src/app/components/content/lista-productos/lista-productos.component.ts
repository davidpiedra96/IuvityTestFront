import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/productoService/producto-service.service';
import { Router } from '@angular/router';
import {
  ProductoInterface,
  lProductoInterface,
} from 'src/app/interface/productoInterface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
  providers: [ProductoService],
})
export class ListaProductosComponent {

  // Variables
  lProducto: lProductoInterface = [];

  producto: ProductoInterface = {
    codigo: 0,
    nombre: '',
    referencia: '',
    unidad: '',
    vlr_unitario: 0,
    saldo_cant: 0,
  };

  token: String = '';

  /**
   * Constructor
   * @param productoService
   * @param cookies
   * @param router
   */
  constructor(
    private productoService: ProductoService,
    private cookies: CookieService,
    private router: Router
  ) {
    this.getListaProductos();
  }

  // Métodos

  /**
   * Método que obtiene la lista de Productos
   */
  getListaProductos() {
    this.productoService.listarProductos(this.getToken()).subscribe(
      (resp:any) => {

        this.lProducto = resp;
        console.log(this.lProducto);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Retorna el token de seguridad
   * @returns Token
   */
  getToken(): string {
    return (this.token = this.cookies.get('token'));
  }

  /**
   * Redirige a la pagina del detalle del producto y su respectivo kardex
   * @param codigo
   */
  verKardex(codigo: number) {
    this.router.navigate(['producto/' + codigo]);
    console.log(codigo);
  }
}
