import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // Variables
  nombre: string = '';

  /**
   * Constructor
   * @param cookies
   * @param router
   */
  constructor(private cookies: CookieService, private router: Router) {
    this.nombre = (this.cookies.check('nombre') ? this.cookies.get('nombre') : '');
  }

  cerrarSesion(){
    console.log(this.cookies.get('token'));
    this.cookies.delete('token');
    this.cookies.delete('nombre');

    console.log(this.cookies.get('token'));

    //this.router.navigate(['login']);
  }

  // Métodos
}
