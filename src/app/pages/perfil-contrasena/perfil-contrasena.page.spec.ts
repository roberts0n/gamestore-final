import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilContrasenaPage } from './perfil-contrasena.page';

describe('PerfilContrasenaPage', () => {
  let component: PerfilContrasenaPage;
  let fixture: ComponentFixture<PerfilContrasenaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
