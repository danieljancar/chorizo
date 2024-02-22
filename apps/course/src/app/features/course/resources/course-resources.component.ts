import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { CourseStateService } from '../../../core/data/course-state.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [],
  templateUrl: './course-resources.component.html',
  styleUrl: './course-resources.component.scss',
})
export class CourseResourcesComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  isLoading: boolean = true;
  private subscription: Subscription = new Subscription();
  private courseStateService = inject(CourseStateService);
  private titleService = inject(Title);

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
          this.titleService.setTitle(
            'Resources - ' + course.title + ' - ' + course.about,
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
