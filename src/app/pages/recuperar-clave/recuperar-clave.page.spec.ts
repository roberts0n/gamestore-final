import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarClavePage } from './recuperar-clave.page';

describe('RecuperarClavePage', () => {
  let component: RecuperarClavePage;
  let fixture: ComponentFixture<RecuperarClavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
