import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioClavePage } from './cambio-clave.page';

describe('CambioClavePage', () => {
  let component: CambioClavePage;
  let fixture: ComponentFixture<CambioClavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
