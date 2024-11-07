import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescripcionPage } from './descripcion.page';

describe('DescripcionPage', () => {
  let component: DescripcionPage;
  let fixture: ComponentFixture<DescripcionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
