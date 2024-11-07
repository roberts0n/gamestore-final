import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCuentasPage } from './editar-cuentas.page';

const routes: Routes = [
  {
    path: '',
    component: EditarCuentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCuentasPageRoutingModule {}
