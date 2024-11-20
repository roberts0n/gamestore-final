import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescripcionPage } from './descripcion.page';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, provideRouter, Router, Routes, withComponentInputBinding } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent } from 'ng-mocks';

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


export const appRoutes: Routes = [
  { path: 'descripcion', component: DescripcionPage },
  // Otras rutas si es necesario
];

describe('DescripcionPage', () => {
  let component: DescripcionPage;
  let fixture: ComponentFixture<DescripcionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescripcionPage,MockComponent(MatIcon)],
      providers: [
        { provide: BdserviceService },
        { provide: ApiserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,HttpClientModule,ReactiveFormsModule,TabsComponent ]

    }).compileComponents();

    fixture = TestBed.createComponent(DescripcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    
   /*  const iconRegistry = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);

    iconRegistry.addSvgIcon(
      'buy',
      sanitizer.bypassSecurityTrustResourceUrl('path/to/buy-icon.svg')
    );

    iconRegistry.addSvgIcon(
      'trash',
      sanitizer.bypassSecurityTrustResourceUrl('path/to/buy-icon.svg')
    ); */

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it("Verificar que no se pueda dejar una reseña con solo espacios blancos. La opcion debe ser elegida si o si para publicar la reseña.",()=>{

    const comentario = component.formulario.get('comentario');
    const opinion = component.formulario.get('opinion');
    comentario?.setValue('           ');
    opinion?.setValue('');
    component.formulario.updateValueAndValidity();

    expect(comentario?.valid).toBeFalse();
    expect(opinion?.valid).toBeFalse();
    expect(component.formulario.valid).toBeFalse();
  })
});
