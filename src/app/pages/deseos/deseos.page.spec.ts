import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeseosPage } from './deseos.page';

describe('DeseosPage', () => {
  let component: DeseosPage;
  let fixture: ComponentFixture<DeseosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeseosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
