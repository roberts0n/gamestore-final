import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCuentasPageRoutingModule } from './editar-cuentas-routing.module';

import { EditarCuentasPage } from './editar-cuentas.page';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCuentasPageRoutingModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [EditarCuentasPage]
})
export class EditarCuentasPageModule {}
