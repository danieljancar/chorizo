import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course/course.types';
import { CourseStateService } from '../../../core/data/course-state.service';
import { Title } from '@angular/platform-browser';
import { CourseService } from '../../../core/data/course.service';
import { CourseTask } from '../../../../../projects/types/src/lib/course/course-tasks.types';
import { MatIcon } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { UserService } from '../../../core/data/user.service';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { ToastService } from '../../../core/feedback/toast.service';
import { ToastType } from '../../../types/feedback/toast.types';
import { CourseSkeletonTasksComponent } from './skeletons/course-skeleton-tasks/course-skeleton-tasks.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatIcon,
    MarkdownComponent,
    RelativeTimePipe,
    CourseSkeletonTasksComponent,
    TranslateModule,
  ],
  templateUrl: './course-tasks.component.html',
  styleUrl: './course-tasks.component.scss',
})
export class CourseTasksComponent implements OnInit, OnDestroy {
  public course: Course | undefined;
  public isLoading: boolean = true;
  public tasks: CourseTask[] | undefined;
  public buttonTimer: boolean = false;
  private user = {
    id: '',
    email: '',
  };
  private subscription: Subscription = new Subscription();
  private courseStateService = inject(CourseStateService);
  private titleService = inject(Title);
  private courseService = inject(CourseService);
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private t = inject(TranslateService);

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
          this.titleService.setTitle(
            this.t.instant('course.tasks.title') +
              ' - ' +
              course.title +
              ' - ' +
              course.about,
          );
          this.subscription.add(
            this.userService.user$.subscribe((user) => {
              if (user) {
                this.user.id = user.id;
                this.user.email = user.email;
                this.subscription.add(
                  this.courseService
                    .getCourseTasks(course.id, user.id)
                    .subscribe((tasks) => {
                      this.tasks = tasks;
                      this.isLoading = false;
                    }),
                );
              }
            }),
          );
        }
      },
    );
  }

  markAsCompleted(taskId: string): void {
    this.buttonTimer = true;
    if (!this.tasks) return;
    const courseId = this.course?.id;
    const user = this.user;

    if (courseId && user) {
      this.courseService.markTaskAsCompleted(courseId, taskId, user);
      setTimeout(() => {
        this.buttonTimer = false;
      }, 1000);
      this.toastService.showToast(
        this.t.instant('course.tasks.mark-as-done-success'),
        ToastType.Success,
      );
    } else {
      this.toastService.showToast(
        'course.tasks.mark-as-done-error',
        ToastType.Error,
      );
    }
  }

  reverseCompletedStatus(taskId: string): void {
    this.buttonTimer = true;
    if (!this.tasks) return;
    const courseId = this.course?.id;
    const userId = this.user.id;

    if (courseId && userId) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        const status = task.done?.status;
        if (status !== undefined) {
          this.courseService.reverseTaskStatus(
            courseId,
            taskId,
            userId,
            status,
          );
        }
      }
      setTimeout(() => {
        this.buttonTimer = false;
      }, 1000);
      this.toastService.showToast(
        this.t.instant('course.tasks.reverse-status-success'),
        ToastType.Success,
      );
    } else {
      this.toastService.showToast(
        this.t.instant('course.tasks.reverse-status-error'),
        ToastType.Error,
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
