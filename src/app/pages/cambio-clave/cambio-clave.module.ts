import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioClavePageRoutingModule } from './cambio-clave-routing.module';

import { CambioClavePage } from './cambio-clave.page';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioClavePageRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [CambioClavePage]
})
export class CambioClavePageModule {}