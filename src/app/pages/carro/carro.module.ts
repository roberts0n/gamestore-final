import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarroPageRoutingModule } from './carro-routing.module';

import { CarroPage } from './carro.page';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarroPageRoutingModule,
    TabsComponent,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [CarroPage]
})
export class CarroPageModule {}
