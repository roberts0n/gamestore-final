import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarClaveFinalPageRoutingModule } from './recuperar-clave-final-routing.module';

import { RecuperarClaveFinalPage } from './recuperar-clave-final.page';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarClaveFinalPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [RecuperarClaveFinalPage]
})
export class RecuperarClaveFinalPageModule {}
