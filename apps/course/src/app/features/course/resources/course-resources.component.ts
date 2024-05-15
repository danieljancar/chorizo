import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course/course.types';
import { CourseStateService } from '../../../core/data/course-state.service';
import { Title } from '@angular/platform-browser';
import { CourseService } from '../../../core/data/course.service';
import { CourseResource } from '../../../../../projects/types/src/lib/course/course-resources.types';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { MatIcon } from '@angular/material/icon';
import { FileDownloadService } from '../../../core/util/file-download.service';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CourseSkeletonResourcesComponent } from './skeletons/course-skeleton-resources/course-skeleton-resources.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    LoadingBarsComponent,
    MatIcon,
    RelativeTimePipe,
    MatProgressSpinner,
    CourseSkeletonResourcesComponent,
  ],
  templateUrl: './course-resources.component.html',
  styleUrls: ['./course-resources.component.scss'],
})
export class CourseResourcesComponent implements OnInit, OnDestroy {
  public course: Course | undefined;
  public isLoading: boolean = true;
  public resources: CourseResource[] | undefined;
  public sortState = {
    name: '',
    date: 'desc',
  };
  private subscription: Subscription = new Subscription();
  private courseStateService = inject(CourseStateService);
  private titleService = inject(Title);
  private courseService = inject(CourseService);
  private fileDownloadService = inject(FileDownloadService);

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
          this.titleService.setTitle(
            `Resources - ${course.title} - ${course.about}`,
          );
          this.subscription = this.courseService
            .getCourseResources(course.id)
            .subscribe((resources) => {
              this.resources = resources;
              this.sortResourcesByLastUpdated('desc');
              this.isLoading = false;
            });
        } else {
          this.isLoading = true;
        }
      },
    );
  }

  public sortResourcesByName(by: 'asc' | 'desc'): void {
    if (!this.resources) return;
    this.resources.sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      return by === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    this.sortState.name = by;
    this.sortState.date = '';
  }

  public sortResourcesByLastUpdated(by: 'asc' | 'desc'): void {
    if (!this.resources) return;
    this.resources.sort((a, b) => {
      const dateA = new Date(a.updatedAt.toDate()).getTime();
      const dateB = new Date(b.updatedAt.toDate()).getTime();
      return by === 'asc' ? dateA - dateB : dateB - dateA;
    });
    this.sortState.date = by;
    this.sortState.name = '';
  }

  public downloadResource(resource: string): void {
    this.fileDownloadService.downloadFile(resource);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
