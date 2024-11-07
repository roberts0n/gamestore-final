import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarUsuarioPageRoutingModule } from './editar-usuario-routing.module';

import { EditarUsuarioPage } from './editar-usuario.page';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarUsuarioPageRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [EditarUsuarioPage]
})
export class EditarUsuarioPageModule {}
