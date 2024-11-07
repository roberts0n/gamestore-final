import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeseosPageRoutingModule } from './deseos-routing.module';

import { DeseosPage } from './deseos.page';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeseosPageRoutingModule,
    TabsComponent,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [DeseosPage]
})
export class DeseosPageModule {}
