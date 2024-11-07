import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarJuegosPage } from './editar-juegos.page';

describe('EditarJuegosPage', () => {
  let component: EditarJuegosPage;
  let fixture: ComponentFixture<EditarJuegosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarJuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
