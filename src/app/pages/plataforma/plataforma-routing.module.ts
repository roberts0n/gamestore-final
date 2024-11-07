import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlataformaPage } from './plataforma.page';

const routes: Routes = [
  {
    path: '',
    component: PlataformaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlataformaPageRoutingModule {}
