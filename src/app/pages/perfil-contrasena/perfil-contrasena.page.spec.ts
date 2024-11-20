import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilContrasenaPage } from './perfil-contrasena.page';
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

describe('PerfilContrasenaPage', () => {
  let component: PerfilContrasenaPage;
  let fixture: ComponentFixture<PerfilContrasenaPage>;


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
      declarations: [PerfilContrasenaPage],
      providers: [
        { provide: BdserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding()) // Mock básico para Router si no lo usas
      ],
      imports: [IonicModule.forRoot(), FormsModule,MatButtonModule,MatIconModule,TabsComponent,ReactiveFormsModule,RouterLink]
    }).compileComponents();
 
    fixture = TestBed.createComponent(PerfilContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Las claves ingresadas tienen que coincidir entre si para funcionar',()=>{
    const password = component.formulario.get('password');
    const password2 = component.formulario.get('password2');

    password?.setValue('hola12345678');
    password2?.setValue('hola12345');

    component.formulario.updateValueAndValidity();

    expect(component.formulario.errors?.['passwordsMismatch']).toBeTrue();
  })
});
