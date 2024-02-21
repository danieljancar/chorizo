import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { CourseStateService } from '../../../core/data/course-state.service';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [],
  templateUrl: './course-documentation.component.html',
  styleUrl: './course-documentation.component.scss',
})
export class CourseDocumentationComponent implements OnInit, OnDestroy {
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
