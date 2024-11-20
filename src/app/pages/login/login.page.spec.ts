import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { provideRouter, RouterLink, Routes, withComponentInputBinding } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  { path: 'descripcion', component: LoginPage }
  // Otras rutas si es necesario
];


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: BdserviceService },
        { provide: ApiserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,ReactiveFormsModule,RouterLink,MatIconModule,MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Verificar que ninguno de los campos esten vacios',()=>{

    const usuario = component.formulario.get('usuario');
    const password = component.formulario.get('password');

    usuario?.setValue('');
    password?.setValue('');

    usuario?.markAsTouched();
    password?.markAsTouched();

    expect(component.formulario.valid).toBeFalse();
    expect(usuario?.hasError('required')).toBeTrue();
    expect(password?.hasError('required')).toBeTrue();
  })
});
