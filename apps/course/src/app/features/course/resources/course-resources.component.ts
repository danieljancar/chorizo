import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { CourseStateService } from '../../../core/data/course-state.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [],
  templateUrl: './course-resources.component.html',
  styleUrl: './course-resources.component.scss',
})
export class CourseResourcesComponent implements OnInit, OnDestroy {
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
