import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/content/login/login.component';
import { PrincipalComponent } from './components/content/principal/principal.component';
import { ListaProductosComponent } from './components/content/lista-productos/lista-productos.component';
import { ProductoComponent } from './components/content/producto/producto.component';
import { ModalAgregarCompraComponent } from './components/modals/modal-agregar-compra/modal-agregar-compra.component';
import { ModalAgregarVentaComponent } from './components/modals/modal-agregar-venta/modal-agregar-venta.component';
import { ModalAgregarDevolucionCompraComponent } from './components/modals/modal-agregar-devolucion-compra/modal-agregar-devolucion-compra.component';
import { ModalAgregarDevolucionVentaComponent } from './components/modals/modal-agregar-devolucion-venta/modal-agregar-devolucion-venta.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    PrincipalComponent,
    ListaProductosComponent,
    ProductoComponent,
    ModalAgregarCompraComponent,
    ModalAgregarVentaComponent,
    ModalAgregarDevolucionCompraComponent,
    ModalAgregarDevolucionVentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
