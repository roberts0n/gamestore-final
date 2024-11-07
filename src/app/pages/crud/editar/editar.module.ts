import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPageRoutingModule } from './editar-routing.module';

import { EditarPage } from './editar.page';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPageRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [EditarPage]
})
export class EditarPageModule {}
