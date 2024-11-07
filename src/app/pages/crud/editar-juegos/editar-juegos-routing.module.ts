import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarJuegosPage } from './editar-juegos.page';

const routes: Routes = [
  {
    path: '',
    component: EditarJuegosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarJuegosPageRoutingModule {}
