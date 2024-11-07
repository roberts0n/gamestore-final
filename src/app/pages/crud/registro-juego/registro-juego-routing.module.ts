import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroJuegoPage } from './registro-juego.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroJuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroJuegoPageRoutingModule {}
