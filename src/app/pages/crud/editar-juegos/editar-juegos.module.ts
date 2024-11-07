import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarJuegosPageRoutingModule } from './editar-juegos-routing.module';

import { EditarJuegosPage } from './editar-juegos.page';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarJuegosPageRoutingModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [EditarJuegosPage]
})
export class EditarJuegosPageModule {}
