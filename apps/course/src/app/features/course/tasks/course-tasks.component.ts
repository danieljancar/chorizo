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

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatIcon, MarkdownComponent, RelativeTimePipe],
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
        'Task marked as completed',
        ToastType.Success,
      );
    } else {
      this.toastService.showToast('An error occurred', ToastType.Error);
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
      this.toastService.showToast('Task status reversed', ToastType.Success);
    } else {
      this.toastService.showToast('An error occurred', ToastType.Error);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
