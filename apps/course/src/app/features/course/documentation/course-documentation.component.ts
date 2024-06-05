import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course/course.types';
import { CourseStateService } from '../../../core/data/course-state.service';
import { Title } from '@angular/platform-browser';
import { CourseService } from '../../../core/data/course.service';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { MatIcon } from '@angular/material/icon';
import { CourseDocumentationNavbarComponent } from './navbar/course-documentation-navbar.component';
import { MarkdownComponent, MarkdownPipe, provideMarkdown } from 'ngx-markdown';
import { FeedbackMessageComponent } from '../../../shared/feedback/feedback-message/feedback-message.component';
import {
  CourseChapter,
  CourseDocument,
} from '../../../../../projects/types/src/lib/course/course-documentation.types';
import { CourseSkeletonDocumentationComponent } from './skeletons/course-skeleton-documentation.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [
    LoadingBarsComponent,
    MatIcon,
    CourseDocumentationNavbarComponent,
    MarkdownComponent,
    MarkdownPipe,
    FeedbackMessageComponent,
    CourseSkeletonDocumentationComponent,
    TranslateModule,
  ],
  templateUrl: './course-documentation.component.html',
  styleUrl: './course-documentation.component.scss',
  providers: [provideMarkdown()],
  encapsulation: ViewEncapsulation.None,
})
export class CourseDocumentationComponent implements OnInit, OnDestroy {
  public course: Course | undefined;
  public chapters: CourseChapter[] | undefined;
  public isLoading: boolean = true;
  public documentationDocument: CourseDocument | undefined;
  @ViewChild(CourseDocumentationNavbarComponent)
  navbarComponent!: CourseDocumentationNavbarComponent;
  private subscription: Subscription = new Subscription();
  private courseStateService = inject(CourseStateService);
  private titleService = inject(Title);
  private courseService = inject(CourseService);
  private t = inject(TranslateService);

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        if (course) {
          this.isLoading = true;
          this.course = course;
          this.titleService.setTitle(
            this.t.instant('course.documentation.title') +
              ' - ' +
              course.title +
              ' - ' +
              course.about,
          );
          this.subscription = this.courseService
            .getCourseChapters(course.id)
            .subscribe((chapters) => {
              this.chapters = chapters;
            });
        } else {
          this.isLoading = true;
        }
      },
    );
  }

  public onDocumentSelected(document: CourseDocument | undefined): void {
    this.documentationDocument = document;
    this.isLoading = false;
  }

  public navigateDocuments(direction: 'next' | 'previous'): void {
    this.navbarComponent.navigateDocuments(direction);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
