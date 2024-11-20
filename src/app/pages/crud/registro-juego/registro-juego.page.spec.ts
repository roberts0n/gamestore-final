import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroJuegoPage } from './registro-juego.page';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { DescripcionPage } from '../../descripcion/descripcion.page';

describe('RegistroJuegoPage', () => {
  let component: RegistroJuegoPage;
  let fixture: ComponentFixture<RegistroJuegoPage>;

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
      declarations: [RegistroJuegoPage],
      providers: [
        { provide: BdserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding()) // Mock básico para Router si no lo usas
      ],
      imports: [IonicModule.forRoot(), FormsModule,MatButtonModule,MatIconModule,TabsComponent,ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

 
    fixture = TestBed.createComponent( RegistroJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('formulario necesita tener todos sus campos con datos para funcionar',()=>{

    const nombre = component.formulario.get('nombre');
    const plataforma = component.formulario.get('plataforma');
    const categoria = component.formulario.get('categoria');
    const descripcion = component.formulario.get('descripcion');
    const precio = component.formulario.get('precio');
    const imagen = component.formulario.get('imagen');

    nombre?.setValue('usuario');
    plataforma?.setValue('1');
    categoria?.setValue('2');
    descripcion?.setValue('una descripcion con 10 letras');
    precio?.setValue(10000);
    imagen?.setValue('image.jpg');


    expect(component.formulario.valid).toBeTrue();

  })


  it('Formulario no debera funcionar si el precio es negativo o la descripcion es menor a 10 letras',()=>{

    const precio = component.formulario.get('precio');
    const descripcion = component.formulario.get('descripcion');

    precio?.setValue(-3000);
    descripcion?.setValue('palabra');

    expect(precio?.valid).toBeFalse();
    expect(descripcion?.valid).toBeFalse();

    
  })
});
