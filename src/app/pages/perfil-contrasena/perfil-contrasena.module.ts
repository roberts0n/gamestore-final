import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilContrasenaPageRoutingModule } from './perfil-contrasena-routing.module';

import { PerfilContrasenaPage } from './perfil-contrasena.page';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilContrasenaPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [PerfilContrasenaPage]
})
export class PerfilContrasenaPageModule {}
