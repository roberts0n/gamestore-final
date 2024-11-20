import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarClaveFinalPage } from './recuperar-clave-final.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarClaveFinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarClaveFinalPageRoutingModule {}
