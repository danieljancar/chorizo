import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course/course.types';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ImageLoaderService } from '../../../core/util/image-loader.service';
import { MarkdownComponent } from 'ngx-markdown';
import { CourseStateService } from '../../../core/course-state.service';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    MarkdownComponent,
    LoadingBarsComponent,
  ],
  templateUrl: './course-introduction.component.html',
  styleUrl: './course-introduction.component.scss',
})
export class CourseIntroductionComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  bannerUrl!: string;
  isLoading: boolean = true;
  private subscription: Subscription = new Subscription();
  private courseStateService = inject(CourseStateService);
  private titleService = inject(Title);
  private imageLoaderService = inject(ImageLoaderService);

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
          this.titleService.setTitle(
            'Intro - ' + course.title + ' - ' + course.about,
          );
          if (course.banner) {
            this.imageLoaderService
              .getDownloadUrl(course.banner)
              .then((url) => {
                this.bannerUrl = url;
                this.isLoading = false;
              })
              .catch(() => {
                this.isLoading = false;
              });
          } else {
            this.bannerUrl = 'assets/placeholder-banner.webp';
            this.isLoading = false;
          }
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
