import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPerfilPage } from './editar-perfil.page';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { DescripcionPage } from '../descripcion/descripcion.page';

describe('EditarPerfilPage', () => {
  let component: EditarPerfilPage;
  let fixture: ComponentFixture<EditarPerfilPage>;

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
      declarations: [EditarPerfilPage],
      providers: [
        { provide: BdserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding()) // Mock básico para Router si no lo usas
      ],
      imports: [IonicModule.forRoot(), FormsModule,MatButtonModule,MatIconModule,TabsComponent,ReactiveFormsModule,RouterLink]
    }).compileComponents();

 
    fixture = TestBed.createComponent(EditarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
