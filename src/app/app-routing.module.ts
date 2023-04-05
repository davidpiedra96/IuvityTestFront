import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/content/login/login.component';
import { PrincipalComponent } from './components/content/principal/principal.component';
import { ProductoComponent } from './components/content/producto/producto.component';
import { VigilanteGuard } from './guard/vigilante.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'productos', component: PrincipalComponent, canActivate:[VigilanteGuard] },
  { path: 'producto/:id', component: ProductoComponent, canActivate:[VigilanteGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
