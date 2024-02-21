import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { CourseStateService } from '../../../core/data/course-state.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [],
  templateUrl: './course-documentation.component.html',
  styleUrl: './course-documentation.component.scss',
})
export class CourseDocumentationComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  isLoading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private courseStateService: CourseStateService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
          this.titleService.setTitle(
            'Documentation - ' + course.title + ' - ' + course.about,
          );
        } else {
          this.isLoading = true;
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
