import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import {
  lProductoInterface,
  ProductoInterface,
} from 'src/app/interface/productoInterface';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  listarProductos(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(enviroment.URL_BASE_PRODUCTO + enviroment.SERVICE_LISTAR_PRODUCTOS, {headers: headers});
  }

  obtenerProducto(token: string, codigo_producto: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(enviroment.URL_BASE_PRODUCTO + enviroment.SERVICE_OBTENER_PRODUCTO + codigo_producto, {headers: headers});

  }
}
