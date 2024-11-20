import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialDetallePage } from './historial-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialDetallePageRoutingModule {}
