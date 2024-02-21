import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ImageLoaderService } from '../../../core/data/image-loader.service';
import { MarkdownComponent } from 'ngx-markdown';
import { NewlineFormatPipe } from '../../../pipes/newline-format.pipe';
import { CourseStateService } from '../../../core/data/course-state.service';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, MarkdownComponent, NewlineFormatPipe],
  templateUrl: './course-introduction.component.html',
  styleUrl: './course-introduction.component.scss',
})
export class CourseIntroductionComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  bannerUrl: string | undefined;
  private subscription: Subscription = new Subscription();

  constructor(
    private courseStateService: CourseStateService,
    private imageLoaderService: ImageLoaderService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        this.course = course;
        if (course?.banner) {
          this.imageLoaderService.getDownloadUrl(course.banner).then((url) => {
            this.bannerUrl = url;
          });
        } else {
          this.bannerUrl = 'assets/placeholder-banner.webp';
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
