import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HeaderComponent,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [LoginPage
  ]
})
export class LoginPageModule {}
