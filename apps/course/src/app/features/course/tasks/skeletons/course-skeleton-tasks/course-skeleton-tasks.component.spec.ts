import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSkeletonTasksComponent } from './course-skeleton-tasks.component';

describe('CourseSkeletonTasksComponent', () => {
  let component: CourseSkeletonTasksComponent;
  let fixture: ComponentFixture<CourseSkeletonTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSkeletonTasksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSkeletonTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
