import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { CourseService } from '../../../core/data/course.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [],
  templateUrl: './course-documentation.component.html',
  styleUrl: './course-documentation.component.scss',
})
export class CourseDocumentationComponent implements OnInit, OnDestroy {
  course$: Observable<Course | undefined>;
  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private title: Title,
  ) {
    this.course$ = new Observable();
  }

  ngOnInit(): void {
    this.course$ = this.courseService.getCurrentCourse();
    this.course$.pipe(takeUntil(this.destroy$)).subscribe((course) => {
      if (course) {
        this.title.setTitle(
          'Documentation - ' +
            course.title +
            ' - ' +
            AppComponent.chorizo.title,
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
