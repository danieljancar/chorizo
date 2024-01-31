import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCoursesOverviewComponent } from './navbar-courses-overview.component';

describe('NavbarCoursesOverviewComponent', () => {
  let component: NavbarCoursesOverviewComponent;
  let fixture: ComponentFixture<NavbarCoursesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCoursesOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarCoursesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
