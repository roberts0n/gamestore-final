import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaPage } from './categoria.page';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { DomSanitizer } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent } from 'ng-mocks';



describe('CategoriaPage', () => {
  let component: CategoriaPage;
  let fixture: ComponentFixture<CategoriaPage>;

  
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
  { path: 'descripcion', component: CategoriaPage }
  // Otras rutas si es necesario
];

class BdserviceServiceMock {
  getJuegoByCategoria() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
  fetchJuegosByCategoria() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
}


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaPage,MockComponent(MatIcon)],
      providers: [
        { provide: BdserviceService, useClass: BdserviceServiceMock },
        { provide: ApiserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,ReactiveFormsModule,MatIconModule,MatButtonModule,TabsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

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


    fixture = TestBed.createComponent(CategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
