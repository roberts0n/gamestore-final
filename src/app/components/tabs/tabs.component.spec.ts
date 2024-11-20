import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsComponent } from './tabs.component';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';



class MockPlatform {
  ready() {
    return Promise.resolve();
  }
}


class MockKeyboard {
  addListener(event: string, callback: () => void) {
    if (event === 'keyboardWillShow') {
      callback(); // Simulamos que el teclado se muestra
    }
    if (event === 'keyboardWillHide') {
      callback(); // Simulamos que el teclado se oculta
    }
  }

  removeAllListeners() {
    // Implementación vacía, ya que no la necesitamos para esta prueba
  }
}

const appRoutes: Routes = [
  { path: 'descripcion', component: TabsComponent }
  // Otras rutas si es necesario
];




describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  const keyboardSpy = jasmine.createSpyObj('Keyboard', ['addListener']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(),TabsComponent],
      providers: [
        provideRouter(appRoutes, withComponentInputBinding())
        
      ],
      
      
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
