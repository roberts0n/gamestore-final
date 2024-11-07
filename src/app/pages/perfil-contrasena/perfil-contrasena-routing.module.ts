import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilContrasenaPage } from './perfil-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilContrasenaPageRoutingModule {}
