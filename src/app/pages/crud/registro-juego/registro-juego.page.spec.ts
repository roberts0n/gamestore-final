import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroJuegoPage } from './registro-juego.page';

describe('RegistroJuegoPage', () => {
  let component: RegistroJuegoPage;
  let fixture: ComponentFixture<RegistroJuegoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
