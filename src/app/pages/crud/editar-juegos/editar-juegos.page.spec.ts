import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarJuegosPage } from './editar-juegos.page';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Routes, provideRouter, withComponentInputBinding, RouterLink } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { DescripcionPage } from '../../descripcion/descripcion.page';
import { of } from 'rxjs';

describe('EditarJuegosPage', () => {
  let component: EditarJuegosPage;
  let fixture: ComponentFixture<EditarJuegosPage>;

  class SQLiteMock {
    create() {
      return Promise.resolve();
    }
  }

  class BdserviceServiceMock {
    getJuegosAdmin() {
      return of([  // Retorna un Observable
        { id: 1, nombre: 'Compra 1' },
        { id: 2, nombre: 'Compra 2' }
      ]);
    }
    fetchJuegosAdmin() {
      return of([  // Retorna un Observable
        { id: 1, nombre: 'Compra 1' },
        { id: 2, nombre: 'Compra 2' }
      ]);
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
      declarations: [EditarJuegosPage],
      providers: [
        { provide: BdserviceService , useClass: BdserviceServiceMock },
        { provide: ApiserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,HttpClientModule,ReactiveFormsModule,TabsComponent,RouterLink,MatIconModule ]

    }).compileComponents();

    fixture = TestBed.createComponent(EditarJuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
