import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioClavePage } from './cambio-clave.page';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouterLink, Routes, withComponentInputBinding } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { DescripcionPage } from '../descripcion/descripcion.page';
import { appRoutes } from '../descripcion/descripcion.page.spec';
import { MatIcon, MatIconModule } from '@angular/material/icon';

describe('CambioClavePage', () => {
  let component: CambioClavePage;
  let fixture: ComponentFixture<CambioClavePage>;

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
      declarations: [CambioClavePage],
      providers: [
        { provide: BdserviceService },
        { provide: ApiserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,HttpClientModule,ReactiveFormsModule,TabsComponent,RouterLink,MatIconModule ]

    }).compileComponents();

    fixture = TestBed.createComponent(CambioClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
