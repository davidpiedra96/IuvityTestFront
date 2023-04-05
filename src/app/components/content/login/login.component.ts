import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/adminService/adminService.service';
import {
  adminLoginInterface,
  loginResponse,
} from '../../../interface/adminLoginInterface';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AdminService],
})
export class LoginComponent {

  // Variables
  usuario: string = '';
  password: string = '';

  adminLogin: adminLoginInterface = {
    username: '',
    password: '',
  };

  loginResponse: loginResponse = {
    token: '',
    type: '',
    nombre: '',
    usuario: '',
    roles: [],
  };

  /**
   * Constructor
   * @param adminService
   * @param cookies
   * @param router
   */
  constructor(
    private adminService: AdminService,
    private cookies: CookieService,
    private router: Router) {
  }

  // Métodos del componente

  /**
   * Método para loguearse y obtener el token
   */
  login(){

    // Se valida que los campos no esten vacios
    if (this.usuario !== '' && this.usuario !== null && this.password !== '' && this.password !== null) {

      // Si los campos no estan vacios, se realiza el login
      this.adminLogin.username = this.usuario;
      this.adminLogin.password = this.password;

      this.adminService.loginAdmin(this.adminLogin).subscribe(
        (resp: any) => {
          console.log(resp);
          this.loginResponse = resp;
          console.log(this.loginResponse.token);
          this.cookies.set('token',this.loginResponse.token);
          this.cookies.set('nombre', this.loginResponse.nombre);
          this.router.navigate(['productos']);
        },
        (error) => {
          console.log('fallo');
        }
      );
    }else {
      console.log('ingrese datos');
    }
  }

  /**
   * Método encargado de que si existe un token redirija a la pagina principal
   */
  validarToken(){
    let token = this.cookies.get('token');
    if (token) {
      this.adminService.validarToken(token).subscribe(
        (resp:any) => {
          if(resp.Validado){
            this.router.navigate(['productos']);
          }
        },
        (error) => {
          this.cookies.delete('token');
          this.cookies.delete('nombre');
          console.log('no hay token');
        }
      );
    }
  }

  /**
   * Ciclo de vida Angular - ngOnInit
   */
  ngOnInit(){
    this.validarToken();
  }
}
