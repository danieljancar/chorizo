import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSkeletonDocumentationNavbarComponent } from './course-skeleton-documentation-navbar.component';

describe('CourseSkeletonDocumentationNavbarComponent', () => {
  let component: CourseSkeletonDocumentationNavbarComponent;
  let fixture: ComponentFixture<CourseSkeletonDocumentationNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSkeletonDocumentationNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      CourseSkeletonDocumentationNavbarComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
