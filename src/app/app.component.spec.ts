import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DescripcionPage } from './pages/descripcion/descripcion.page';
import { BdserviceService } from './services/bdservice.service';

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

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: BdserviceService },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding()) // Mock básico para Router si no lo usas
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
