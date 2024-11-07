import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarClavePageRoutingModule } from './recuperar-clave-routing.module';

import { RecuperarClavePage } from './recuperar-clave.page';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarClavePageRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [RecuperarClavePage]
})
export class RecuperarClavePageModule {}
