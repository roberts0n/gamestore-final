import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAdminPageRoutingModule } from './menu-admin-routing.module';

import { MenuAdminPage } from './menu-admin.page';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAdminPageRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  declarations: [MenuAdminPage]
})
export class MenuAdminPageModule {}
