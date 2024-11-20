import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { PlataformaPage } from './plataforma.page';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { DomSanitizer } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { MockComponent } from 'ng-mocks';

describe('CategoriaPage', () => {
  let component: PlataformaPage;
  let fixture: ComponentFixture<PlataformaPage>;

  
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
  { path: 'descripcion', component: PlataformaPage }
  // Otras rutas si es necesario
];

class BdserviceServiceMock {
  getJuegoByPlataforma() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
  fetchJuegosByPlataforma() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
}


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlataformaPage,MockComponent(MatIcon)],
      providers: [
        { provide: BdserviceService, useClass: BdserviceServiceMock },
        { provide: ApiserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,ReactiveFormsModule,MatIconModule,MatButtonModule,TabsComponent]
    }).compileComponents();

    /* const iconRegistry = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);

    iconRegistry.addSvgIcon(
      'buy',
      sanitizer.bypassSecurityTrustResourceUrl('path/to/buy-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'trash',
      sanitizer.bypassSecurityTrustResourceUrl('path/to/buy-icon.svg')
    ); */

    fixture = TestBed.createComponent(PlataformaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
