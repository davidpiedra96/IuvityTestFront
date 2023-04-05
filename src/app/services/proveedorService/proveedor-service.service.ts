import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  /**
   * Constructor
   * @param http
   */
  constructor(
    private http: HttpClient
  ) { }

  // Servicios
  obtenerProveedorPorCodigo(token: string, codigo:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(enviroment.URL_BASE_PROVEEDOR + enviroment.SERVICE_OBTENER_PROVEEDOR_CODIGO + codigo, {headers: headers});
  }


}
