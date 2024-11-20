import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

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
    { path: 'descripcion', component: RegistroPage }
    // Otras rutas si es necesario
  ];
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      providers: [
        { provide: BdserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,ReactiveFormsModule,MatIconModule,MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Verificar que cada campo cumpla con sus debidos requisitos, como la longitud de la clave, formato de correo, y el minimo de longitud para un usuario',()=>{

    const email = component.formulario.get('email');
    const usuario = component.formulario.get('usuario');
    const password = component.formulario.get('password');
    const password2 = component.formulario.get('password2');
  
    email?.setValue('correofalso.com')
    usuario?.setValue('ttt')
    password?.setValue('hola12345678')
    password2?.setValue('hola12345')


    expect(email?.valid).toBeFalse();
    expect(usuario?.valid).toBeFalse();
    expect(password?.valid).toBeFalse();
  
  })
});

