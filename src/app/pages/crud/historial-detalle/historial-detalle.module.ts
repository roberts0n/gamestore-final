import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialDetallePageRoutingModule } from './historial-detalle-routing.module';

import { HistorialDetallePage } from './historial-detalle.page';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialDetallePageRoutingModule,
    TabsComponent,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [HistorialDetallePage]
})
export class HistorialDetallePageModule {}
