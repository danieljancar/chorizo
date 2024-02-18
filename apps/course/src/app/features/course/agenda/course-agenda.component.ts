import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { CourseService } from '../../../core/data/course.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [],
  templateUrl: './course-agenda.component.html',
  styleUrl: './course-agenda.component.scss',
})
export class CourseAgendaComponent implements OnInit, OnDestroy {
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
          'Agenda - ' + course.title + ' - ' + AppComponent.chorizo.title,
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
