import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course/course.types';
import { CourseStateService } from '../../../core/data/course-state.service';
import { Title } from '@angular/platform-browser';
import { CourseAgenda } from '../../../../../projects/types/src/lib/course/course-agenda.types';
import { CourseService } from '../../../core/data/course.service';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';

@Component({
  selector: 'app-agenda',
  standalone: true,
  templateUrl: './course-agenda.component.html',
  styleUrl: './course-agenda.component.scss',
  imports: [LoadingBarsComponent],
})
export class CourseAgendaComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  isLoading: boolean = true;
  public agenda: CourseAgenda[] = [];

  private subscription: Subscription = new Subscription();
  private courseStateService = inject(CourseStateService);
  private courseService = inject(CourseService);
  private titleService = inject(Title);

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
          this.titleService.setTitle(
            'Agenda - ' + course.title + ' - ' + course.about,
          );
          this.subscription.add(
            this.courseService
              .getCourseAgenda(course.id)
              .subscribe((agenda) => {
                this.agenda = agenda;
                this.isLoading = false;
              }),
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
