import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPageRoutingModule } from './categoria-routing.module';

import { CategoriaPage } from './categoria.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPageRoutingModule,
    HeaderComponent,
    TabsComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  declarations: [CategoriaPage]
})
export class CategoriaPageModule {}
