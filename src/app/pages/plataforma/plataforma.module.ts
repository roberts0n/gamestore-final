import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlataformaPageRoutingModule } from './plataforma-routing.module';

import { PlataformaPage } from './plataforma.page';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlataformaPageRoutingModule,
    HeaderComponent,
    TabsComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  declarations: [PlataformaPage]
})
export class PlataformaPageModule {}
