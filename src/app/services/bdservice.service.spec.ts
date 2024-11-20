import { TestBed } from '@angular/core/testing';

import { BdserviceService } from './bdservice.service';
import { AlertserviceService } from './alertservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { DescripcionPage } from '../pages/descripcion/descripcion.page';


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

describe('BdserviceService', () => {
  let service: BdserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide : AlertserviceService },
        {provide : SQLite, useClass: SQLiteMock},
        provideRouter(appRoutes,withComponentInputBinding())
      ]
    }).compileComponents();
    service = TestBed.inject(BdserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


