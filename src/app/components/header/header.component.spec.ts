import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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
    { path: 'descripcion', component: HeaderComponent }
    // Otras rutas si es necesario
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(),HeaderComponent],
      providers: [
        { provide: BdserviceService },
        { provide: ApiserviceService },
        { provide: AlertserviceService, useClass: AlertserviceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
