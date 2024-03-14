import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDocumentationNavbarComponent } from './course-documentation-navbar.component';

describe('CourseDocumentationNavbarComponent', () => {
  let component: CourseDocumentationNavbarComponent;
  let fixture: ComponentFixture<CourseDocumentationNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDocumentationNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDocumentationNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
