import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuAdminPage } from './menu-admin.page';

describe('MenuAdminPage', () => {
  let component: MenuAdminPage;
  let fixture: ComponentFixture<MenuAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
