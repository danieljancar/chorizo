import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course/course.types';
import { CourseStateService } from '../../../core/course-state.service';
import { Title } from '@angular/platform-browser';
import { CourseService } from '../../../core/course.service';
import { CourseTask } from '../../../../../projects/types/src/lib/course/course-tasks.types';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './course-tasks.component.html',
  styleUrl: './course-tasks.component.scss',
})
export class CourseTasksComponent implements OnInit, OnDestroy {
  public course: Course | undefined;
  public isLoading: boolean = true;
  public tasks: CourseTask[] | undefined;
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
            'Tasks - ' + course.title + ' - ' + course.about,
          );
          this.subscription.add(
            this.courseService.getCourseTasks(course.id).subscribe((tasks) => {
              this.tasks = tasks;
              this.isLoading = false;
              console.log(tasks);
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
