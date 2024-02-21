import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ImageLoaderService } from '../../../core/data/image-loader.service';
import { MarkdownComponent } from 'ngx-markdown';
import { NewlineFormatPipe } from '../../../pipes/newline-format.pipe';
import { CourseStateService } from '../../../core/data/course-state.service';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    MarkdownComponent,
    NewlineFormatPipe,
    LoadingBarsComponent,
  ],
  templateUrl: './course-introduction.component.html',
  styleUrl: './course-introduction.component.scss',
})
export class CourseIntroductionComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  bannerUrl: string | undefined;
  isLoading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private courseStateService: CourseStateService,
    private imageLoaderService: ImageLoaderService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
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
