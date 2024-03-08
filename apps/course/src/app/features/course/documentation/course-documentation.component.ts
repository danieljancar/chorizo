import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Course,
  CourseChapter,
} from '../../../../../projects/types/src/lib/course.types';
import { CourseStateService } from '../../../core/course-state.service';
import { Title } from '@angular/platform-browser';
import { CourseService } from '../../../core/course.service';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [LoadingBarsComponent, MatIcon],
  templateUrl: './course-documentation.component.html',
  styleUrl: './course-documentation.component.scss',
})
export class CourseDocumentationComponent implements OnInit, OnDestroy {
  public course: Course | undefined;
  public chapters: CourseChapter[] | undefined;
  public isLoading: boolean = true;
  private chapterSubscription: Subscription = new Subscription();
  private subscription: Subscription = new Subscription();
  private courseStateService = inject(CourseStateService);
  private titleService = inject(Title);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
          this.titleService.setTitle(
            'Documentation - ' + course.title + ' - ' + course.about,
          );
          this.chapterSubscription = this.courseService
            .getCourseChapters(course.id)
            .subscribe((chapters) => {
              this.chapters = chapters;
            });
          this.isLoading = false;
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
