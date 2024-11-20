import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResenasPage } from './resenas.page';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite';
import { IonicModule } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { of } from 'rxjs';
import { HistorialPage } from '../historial/historial.page';

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
  getReseñasGeneral() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
  fetchReseñasGeneral() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
}

 const appRoutes: Routes = [
  { path: 'descripcion', component: HistorialPage },
  // Otras rutas si es necesario
];

describe('ResenasPage', () => {
  let component: ResenasPage;
  let fixture: ComponentFixture<ResenasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResenasPage],
      providers: [
        { provide: BdserviceService,useClass: BdserviceServiceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideRouter(appRoutes, withComponentInputBinding()) // Mock básico para Router si no lo usas
      ],
      imports: [IonicModule.forRoot(), FormsModule,MatButtonModule,MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ResenasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
