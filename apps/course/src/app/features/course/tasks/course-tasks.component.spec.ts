import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTasksComponent } from './course-tasks.component';

describe('TasksComponent', () => {
  let component: CourseTasksComponent;
  let fixture: ComponentFixture<CourseTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseTasksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
