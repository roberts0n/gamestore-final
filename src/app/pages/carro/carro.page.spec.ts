import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarroPage } from './carro.page';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { DomSanitizer } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CarroPage', () => {
  let component: CarroPage;
  let fixture: ComponentFixture<CarroPage>;

  class MatIconRegistryMock {
    addSvgIcon() {
      return this;
    }
    addSvgIconLiteral() {
      return this;
    }
    addSvgIconSetInNamespace() {
      return this;
    }
    getNamedSvgIcon() {
      return of(null);
    }
    registerFontClassAlias() {
      return this;
    }
    getDefaultFontSetClass() {
      return 'material-icons'; // O el valor que utilices en tu aplicación
    }
  }
  
  class DomSanitizerMock {
    bypassSecurityTrustResourceUrl(url: string) {
      return url;
    }
  }

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

  

  class BdserviceServiceMock {
    getJuegosCarro() {
      return of([  // Retorna un Observable
        { id: 1, nombre: 'Compra 1' },
        { id: 2, nombre: 'Compra 2' }
      ]);
    }
    fetchCarro() {
      return of([  // Retorna un Observable
        { id: 1, nombre: 'Compra 1' },
        { id: 2, nombre: 'Compra 2' }
      ]);
    }
    fetchTotal(){
      return of(10);
    }
    getTotal(){
      return 10;
    }
  }
  
  const appRoutes: Routes = [
    { path: 'descripcion', component: CarroPage },
    // Otras rutas si es necesario
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarroPage],
      providers: [
        { provide: BdserviceService,useClass: BdserviceServiceMock },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding()) // Mock básico para Router si no lo usas
      ],
      imports: [IonicModule.forRoot(), FormsModule,MatButtonModule,MatIconModule,TabsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const iconRegistry = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);

    iconRegistry.addSvgIcon(
      'buy',
      sanitizer.bypassSecurityTrustResourceUrl('path/to/buy-icon.svg')
    );
 
    fixture = TestBed.createComponent(CarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
