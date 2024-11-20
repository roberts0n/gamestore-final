/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialPage } from './historial.page';

describe('HistorialPage', () => {
  let component: HistorialPage;
  let fixture: ComponentFixture<HistorialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialPage } from './historial.page';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { provideRouter, Router, Routes, withComponentInputBinding } from '@angular/router';
import { of } from 'rxjs';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Mock del servicio SQLite
class SQLiteMock {
  executeSql(query: string, params: any[]) {
    return Promise.resolve({
      rows: { length: 0, item: (index: number) => null }
    });
  }

  // Si hay más métodos que el servicio usa, añádelos aquí.
  create() {
    return Promise.resolve();
  }
}

// Mock del servicio BdserviceService
class BdserviceServiceMock {
  getComprasGeneral() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
  fetchComprasGeneral() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
}

export const appRoutes: Routes = [
  { path: 'descripcion', component: HistorialPage },
  // Otras rutas si es necesario
];


describe('HistorialPage', () => {
  let component: HistorialPage;
  let fixture: ComponentFixture<HistorialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialPage],
      providers: [
        { provide: BdserviceService,useClass: BdserviceServiceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideRouter(appRoutes, withComponentInputBinding()) // Mock básico para Router si no lo usas
      ],
      imports: [IonicModule.forRoot(), FormsModule,MatButtonModule,MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});