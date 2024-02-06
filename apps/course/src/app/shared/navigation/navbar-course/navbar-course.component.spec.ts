import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCourseComponent } from './navbar-course.component';

describe('NavbarCourseDetailComponent', () => {
  let component: NavbarCourseComponent;
  let fixture: ComponentFixture<NavbarCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCourseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
