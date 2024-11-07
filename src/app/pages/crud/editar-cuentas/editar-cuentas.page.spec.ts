import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarCuentasPage } from './editar-cuentas.page';

describe('EditarCuentasPage', () => {
  let component: EditarCuentasPage;
  let fixture: ComponentFixture<EditarCuentasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCuentasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
