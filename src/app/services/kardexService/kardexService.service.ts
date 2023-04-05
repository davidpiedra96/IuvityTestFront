import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import {
  KardexInterface,
  lKardex,
  RequestConsultarKardexProducto,
  RequestDevolucionCompra,
  RequestDevolucionVenta,
  RequestIngresarCompraProducto,
  RequestIngresarStock,
  RequestVentaProducto,
} from 'src/app/interface/kardexInterface';

@Injectable({
  providedIn: 'root',
})
export class KardexService {
  constructor(private http: HttpClient) {}

  /**
   * Servicio que obtiene el kardex del producto por mes y anio
   * @param token
   * @param requestConsultarKardexProducto
   * @returns Retorna un subscribe con la información del kardex por mes y anio
   */
  consultaKardexMesAnio(
    token: string,
    requestConsultarKardexProducto: RequestConsultarKardexProducto
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      enviroment.URL_BASE_KARDEX + enviroment.SERVICE_CONSULTA_KARDEX_MES_ANIO,
      requestConsultarKardexProducto,
      { headers: headers }
    );
  }

  /**
   * Servicio que ingresa la compra de producto al kardex
   * @param token
   * @param request
   * @returns response
   */
  ingresarCompraProducto(
    token: string,
    request: RequestIngresarCompraProducto
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      enviroment.URL_BASE_KARDEX + enviroment.SERVICE_INGRESAR_COMPRA_PRODUCTO,
      request,
      { headers: headers }
    );
  }

  /**
   * Servicio que realiza la devolución de la compra de un producto
   * @param token
   * @param request
   */
  devolucionCompraProducto(token: string, request: RequestDevolucionCompra) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      enviroment.URL_BASE_KARDEX + enviroment.SERVICE_DEVOLUCION_COMPRA,
      request,
      { headers: headers }
    );
  }

  /**
   * Servicio que ingresa la venta de un producto
   * @param token
   * @param request
   */
  ingresarVentaProducto(token: string, request: RequestVentaProducto) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      enviroment.URL_BASE_KARDEX + enviroment.SERVICE_INGRESAR_VENTA,
      request,
      { headers: headers }
    );
  }

  /**
   * Servicio que realiza la devolición de una venta
   * @param token
   * @param request
   */
  devolucionVentaProducto(token: string, request: RequestDevolucionVenta) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      enviroment.URL_BASE_KARDEX + enviroment.SERVICE_DEVOLUCION_VENTA,
      request,
      { headers: headers }
    );
  }

  /**
   * Servicio que realiza el ingreso de un producto nuevo
   * @param token
   * @param request
   */
  ingresarProductoNuevo(token: string, request: RequestIngresarStock) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      enviroment.URL_BASE_KARDEX + enviroment.SERVICE_INGRESAR_PRODUCTO,
      request,
      { headers: headers }
    );
  }
}
