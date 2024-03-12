import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Course,
  CourseChapter,
  CourseDocument,
} from '../../../../../projects/types/src/lib/course.types';
import { CourseStateService } from '../../../core/course-state.service';
import { Title } from '@angular/platform-browser';
import { CourseService } from '../../../core/course.service';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { MatIcon } from '@angular/material/icon';
import { CourseDocumentationNavbarComponent } from './navbar/course-documentation-navbar.component';
import { MarkdownComponent, MarkdownPipe, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [
    LoadingBarsComponent,
    MatIcon,
    CourseDocumentationNavbarComponent,
    MarkdownComponent,
    MarkdownPipe,
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
  protected readonly provideMarkdown = provideMarkdown;
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
            'Documentation - ' + course.title + ' - ' + course.about,
          );
          this.subscription = this.courseService
            .getCourseChapters(course.id)
            .subscribe((chapters) => {
              this.chapters = chapters;
            });
          this.isLoading = false;
        } else {
          this.isLoading = true;
        }
      },
    );
  }

  onDocumentSelected(document: CourseDocument | undefined): void {
    this.documentationDocument = document;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
