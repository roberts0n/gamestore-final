import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarClavePage } from './recuperar-clave.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarClavePageRoutingModule {}
