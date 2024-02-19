import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { CourseService } from '../../../core/data/course.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../../../app.component';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ImageLoaderService } from '../../../core/data/image-loader.service';
import { MarkdownComponent } from 'ngx-markdown';
import { NewlineFormatPipe } from '../../../pipes/newline-format.pipe';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, MarkdownComponent, NewlineFormatPipe],
  templateUrl: './course-introduction.component.html',
  styleUrl: './course-introduction.component.scss',
})
export class CourseIntroductionComponent implements OnInit, OnDestroy {
  course$: Observable<Course | undefined>;
  bannerUrl: string | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private title: Title,
    private imageLoaderService: ImageLoaderService,
  ) {
    this.course$ = new Observable();
  }

  async ngOnInit() {
    this.course$ = this.courseService.getCurrentCourse();
    this.course$.pipe(takeUntil(this.destroy$)).subscribe(async (course) => {
      if (course) {
        this.bannerUrl = await this.imageLoaderService.getDownloadUrl(
          course.banner,
        );
        this.title.setTitle(
          course.title + ' - Introduction' + ' - ' + AppComponent.chorizo.title,
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
