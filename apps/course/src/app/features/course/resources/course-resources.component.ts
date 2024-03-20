import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course/course.types';
import { CourseStateService } from '../../../core/course-state.service';
import { Title } from '@angular/platform-browser';
import { CourseService } from '../../../core/course.service';
import { CourseResource } from '../../../../../projects/types/src/lib/course/course-resources.types';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { MatIcon } from '@angular/material/icon';
import { ToastService } from '../../../core/feedback/toast.service';
import { FileDownloadService } from '../../../core/util/file-download.service';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [LoadingBarsComponent, MatIcon, RelativeTimePipe],
  templateUrl: './course-resources.component.html',
  styleUrl: './course-resources.component.scss',
})
export class CourseResourcesComponent implements OnInit, OnDestroy {
  public course: Course | undefined;
  public isLoading: boolean = true;
  public resources: CourseResource[] | undefined;
  private subscription: Subscription = new Subscription();
  private courseStateService = inject(CourseStateService);
  private titleService = inject(Title);
  private courseService = inject(CourseService);
  private toastService = inject(ToastService);
  private fileDownloadService = inject(FileDownloadService);

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
          this.titleService.setTitle(
            'Resources - ' + course.title + ' - ' + course.about,
          );
          this.subscription = this.courseService
            .getCourseResources(course.id)
            .subscribe((resources) => {
              this.resources = resources;
              this.isLoading = false;
            });
        } else {
          this.isLoading = true;
        }
      },
    );
  }

  public downloadResource(resource: CourseResource): void {
    this.fileDownloadService.downloadFile(resource.source);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
