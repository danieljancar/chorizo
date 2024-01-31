import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCourseDetailComponent } from './navbar-course-detail.component';

describe('NavbarCourseDetailComponent', () => {
  let component: NavbarCourseDetailComponent;
  let fixture: ComponentFixture<NavbarCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCourseDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
