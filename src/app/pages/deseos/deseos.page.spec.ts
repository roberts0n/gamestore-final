import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeseosPage } from './deseos.page';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { DomSanitizer } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
 import { MockComponent } from 'ng-mocks'; 

class SQLiteMock {
  create() {
    return Promise.resolve();
  }
}

class BdserviceServiceMock {
  getDeseados() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
  fetchDeseados() {
    return of([  // Retorna un Observable
      { id: 1, nombre: 'Compra 1' },
      { id: 2, nombre: 'Compra 2' }
    ]);
  }
}


const appRoutes: Routes = [
  { path: 'descripcion', component: DeseosPage }
  // Otras rutas si es necesario
];




describe('DeseosPage', () => {
  let component: DeseosPage;
  let fixture: ComponentFixture<DeseosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeseosPage,MockComponent(MatIcon)],
      providers: [
        { provide: BdserviceService, useClass: BdserviceServiceMock },
        { provide: SQLite, useClass: SQLiteMock },
        provideHttpClient(),
        provideRouter(appRoutes, withComponentInputBinding())
        /* provideRouter(appRoutes, withComponentInputBinding()) */
        
      ],
      imports: [IonicModule.forRoot(), FormsModule,ReactiveFormsModule,MatIconModule,MatButtonModule,MatListModule, MatCardModule,TabsComponent]  
    }).compileComponents();

    fixture = TestBed.createComponent(DeseosPage);
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
    );
 */
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
