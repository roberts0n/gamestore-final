import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarUsuarioPage } from './editar-usuario.page';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Routes, provideRouter, withComponentInputBinding, RouterLink } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { DescripcionPage } from '../../descripcion/descripcion.page';

describe('EditarUsuarioPage', () => {
  let component: EditarUsuarioPage;
  let fixture: ComponentFixture<EditarUsuarioPage>;

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
      declarations: [EditarUsuarioPage],
      providers: [
        { provide: BdserviceService  },
        { provide: ApiserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,HttpClientModule,ReactiveFormsModule,TabsComponent,RouterLink,MatIconModule ]

    }).compileComponents();

    fixture = TestBed.createComponent(EditarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
