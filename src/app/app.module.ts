import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TabsComponent } from './components/tabs/tabs.component';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';


@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HeaderComponent,TabsComponent,HttpClientModule],
  providers: [{ provide:  RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(),provideHttpClient(),NativeStorage,SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry,private domSanitizer:DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      'Steam',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/steam.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'profile',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/profile.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Xbox',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/xbox.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Switch',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/nintendo-switch.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'Playstation',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/playstation.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'trash',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/trash.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'buy',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/buy.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'upload2',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/upload.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'user',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/user.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'aventura',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/aventura.svg')
    );
  }
}
