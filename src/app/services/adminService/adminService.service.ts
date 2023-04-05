import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environments';
import { adminLoginInterface, loginResponse } from 'src/app/interface/adminLoginInterface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  loginAdmin (usuario: adminLoginInterface) {
    let header = new HttpHeaders()
      .set('Type-content', 'application/json');

    return this.http.post(enviroment.URL_BASE_ADMIN + enviroment.SERVICE_LOGIN, usuario);
  }

  validarToken(token: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(enviroment.URL_BASE_ADMIN + enviroment.SERVICE_VALIDAR_TOKEN, {headers: headers});
  }
}
