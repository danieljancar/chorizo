import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { CourseStateService } from '../../../core/data/course-state.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './course-tasks.component.html',
  styleUrl: './course-tasks.component.scss',
})
export class CourseTasksComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  private subscription: Subscription = new Subscription();

  constructor(private courseStateService: CourseStateService) {}

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        this.course = course;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
