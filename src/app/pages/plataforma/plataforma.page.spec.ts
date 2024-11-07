import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlataformaPage } from './plataforma.page';

describe('PlataformaPage', () => {
  let component: PlataformaPage;
  let fixture: ComponentFixture<PlataformaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlataformaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
