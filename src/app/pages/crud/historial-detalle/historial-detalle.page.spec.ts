import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialDetallePage } from './historial-detalle.page';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { DescripcionPage } from '../../descripcion/descripcion.page';

describe('HistorialDetallePage', () => {
  let component: HistorialDetallePage;
  let fixture: ComponentFixture<HistorialDetallePage>;

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
  
  
  const appRoutes: Routes = [
    { path: 'descripcion', component: DescripcionPage },
    // Otras rutas si es necesario
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialDetallePage],
      providers: [
        { provide: BdserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding()) // Mock básico para Router si no lo usas
      ],
      imports: [IonicModule.forRoot(), FormsModule,MatButtonModule,MatIconModule,TabsComponent]
    }).compileComponents();
 
    fixture = TestBed.createComponent(HistorialDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
