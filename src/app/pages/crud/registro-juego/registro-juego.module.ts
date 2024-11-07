import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroJuegoPageRoutingModule } from './registro-juego-routing.module';

import { RegistroJuegoPage } from './registro-juego.page';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroJuegoPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroJuegoPage]
})
export class RegistroJuegoPageModule {}
