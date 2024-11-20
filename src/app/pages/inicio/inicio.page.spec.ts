import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { of } from 'rxjs';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent } from 'ng-mocks';

class SQLiteMock {
  executeSql(query: string, params: any[]) {
    // Simulamos una respuesta como si fuera la base de datos real.
    return Promise.resolve({
      rows: {
        length: 1,
        item: (index: number) => ({ idJuego: 1, nombre_juego: 'Juego Mock' }) // Devolvemos un juego mock
      }
    });
  }

  // Puedes agregar más métodos si tu servicio los necesita, como create, open, etc.
  open() {
    return Promise.resolve();
  }
}
class BdserviceMock {
  // Mock de getJuegos
  getJuegos() {
    return Promise.resolve({
      rows: {
        length: 1,
        item: (index: number) => ({ idJuego: 1, nombre_juego: 'Juego Mock' })
      }
    });
  }

  // Mock de fetchJuegos
  fetchJuegos() {
    return of([{ idJuego: 1, nombre_juego: 'Juego Mock' }]); // Devolvemos un Observable
  }

  // Mock de getJuegosRandom
  getJuegosRandom() {
    return Promise.resolve({
      rows: {
        length: 1,
        item: (index: number) => ({ idJuego: 1, nombre_juego: 'Juego Random' })
      }
    });
  }

  // Mock de fetchJuegosRandom
  fetchJuegosRandom() {
    return of([{ idJuego: 1, nombre_juego: 'Juego Random' }]); // Devolvemos un Observable
  }

}

class AlertserviceMock {
  presentAlert(title: string, message: string) {
    return Promise.resolve();
  }
}

export const appRoutes: Routes = [
  { path: 'descripcion', component: InicioPage },
  // Otras rutas si es necesario
];



describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioPage,MockComponent(MatIcon)],
      providers: [
        { provide: BdserviceService, useClass: BdserviceMock},
        { provide: ApiserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,HttpClientModule,ReactiveFormsModule,TabsComponent,MatButtonModule,MatIconModule ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
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
