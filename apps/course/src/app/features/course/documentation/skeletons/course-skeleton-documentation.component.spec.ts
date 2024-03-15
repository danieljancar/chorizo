import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSkeletonDocumentationComponent } from './course-skeleton-documentation.component';

describe('CourseSkeletonDocumentationComponent', () => {
  let component: CourseSkeletonDocumentationComponent;
  let fixture: ComponentFixture<CourseSkeletonDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSkeletonDocumentationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSkeletonDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
