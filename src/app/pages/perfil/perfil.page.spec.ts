import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
class SQLiteMock {
  create() {
    return Promise.resolve();
  }
}





class AlertserviceMock {
  presentAlert(title: string, message: string) {
    return Promise.resolve();
  }
}

export const appRoutes: Routes = [
  { path: 'descripcion', component: PerfilPage },
  // Otras rutas si es necesario
];





describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      providers: [
        { provide: BdserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding())  
      ],
      imports: [IonicModule.forRoot(), FormsModule,TabsComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const iconRegistry = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);

    iconRegistry.addSvgIcon(
      'buy',
      sanitizer.bypassSecurityTrustResourceUrl('path/to/buy-icon.svg')
    );

    iconRegistry.addSvgIcon(
      'trash',
      sanitizer.bypassSecurityTrustResourceUrl('path/to/buy-icon.svg')
    );

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
