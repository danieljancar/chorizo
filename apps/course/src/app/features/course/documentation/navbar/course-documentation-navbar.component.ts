import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { CourseService } from '../../../../core/course.service';
import { CourseStateService } from '../../../../core/course-state.service';
import { NgClass } from '@angular/common';
import { LoadingBarsComponent } from '../../../../shared/feedback/loading-bars/loading-bars.component';
import { FeedbackMessageComponent } from '../../../../shared/feedback/feedback-message/feedback-message.component';
import {
  CourseChapter,
  CourseDocument,
} from '../../../../../../projects/types/src/lib/course/course-documentation.types';
import { CourseSkeletonDocumentationNavbarComponent } from '../skeletons/course-skeleton-documentation-navbar.component';

@Component({
  selector: 'app-course-documentation-navbar',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    NgClass,
    LoadingBarsComponent,
    FeedbackMessageComponent,
    CourseSkeletonDocumentationNavbarComponent,
  ],
  templateUrl: './course-documentation-navbar.component.html',
  styleUrls: ['./course-documentation-navbar.component.scss'],
})
export class CourseDocumentationNavbarComponent implements OnInit, OnDestroy {
  public chapters: CourseChapter[] | undefined;
  public isLoading = true;
  public currentDocumentId: string | undefined;
  @Output() documentSelected = new EventEmitter<CourseDocument>();
  private subscription = new Subscription();
  private courseService = inject(CourseService);
  private courseStateService = inject(CourseStateService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.subscription.add(
      this.courseStateService.currentCourse$.subscribe((course) => {
        if (course) {
          this.isLoading = true;
          this.courseService
            .getCourseChapters(course.id)
            .subscribe((chapters) => {
              this.chapters = chapters;
              this.chapters.map((chapter) => {
                this.subscription.add(
                  this.courseService
                    .getCourseChapterDocuments(course.id, chapter.id)
                    .subscribe((documents) => {
                      chapter.documents = documents;
                      this.setupRouterEvents(chapters);
                      this.isLoading = false;
                    }),
                );
              });
            });
        }
      }),
    );
  }

  public selectDocument(
    chapter?: CourseChapter,
    document?: CourseDocument,
  ): void {
    if (chapter && document) {
      this.router
        .navigate([], {
          queryParams: { cId: chapter.id, dId: document.id },
        })
        .then(() => {
          this.currentDocumentId = document.id;
          this.documentSelected.emit(document);
        });
    } else {
      this.documentSelected.emit(undefined);
    }
  }

  public handleDrawerDocumentClick(): void {
    document.getElementById('course-documentation-navbar-drawer')?.click();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public navigateDocuments(direction: 'next' | 'previous'): void {
    if (!this.chapters) return;

    let found = false;
    let targetChapterIndex: number = 0;
    let targetDocumentIndex: number = 0;

    for (
      let chapterIndex = 0;
      chapterIndex < this.chapters.length && !found;
      chapterIndex++
    ) {
      const chapter = this.chapters[chapterIndex];
      for (
        let documentIndex = 0;
        documentIndex < chapter.documents?.length && !found;
        documentIndex++
      ) {
        if (chapter.documents[documentIndex].id === this.currentDocumentId) {
          targetChapterIndex = chapterIndex;
          targetDocumentIndex =
            direction === 'next' ? documentIndex + 1 : documentIndex - 1;
          found = true;
        }
      }
    }

    // Adjust indices for cross-chapter navigation
    if (found) {
      if (targetDocumentIndex < 0 && targetChapterIndex > 0) {
        targetChapterIndex--;
        targetDocumentIndex =
          this.chapters[targetChapterIndex].documents?.length - 1 || 0;
      } else if (
        targetDocumentIndex >=
          this.chapters[targetChapterIndex].documents?.length &&
        targetChapterIndex < this.chapters.length - 1
      ) {
        targetChapterIndex++;
        targetDocumentIndex = 0;
      }
    }

    const targetChapter = this.chapters[targetChapterIndex];
    const targetDocument = targetChapter?.documents?.[targetDocumentIndex];
    if (targetDocument) {
      this.selectDocument(targetChapter, targetDocument);
    }
  }

  // Sets up the router events to select the current document based on the query params or the first document if none are provided
  private setupRouterEvents(chapters: CourseChapter[]): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const chapterId = params['cId'];
      const documentId = params['dId'];

      if (chapterId && documentId) {
        const chapter = chapters.find((c) => c.id === chapterId);
        const document = chapter?.documents?.find((d) => d.id === documentId);
        if (chapter && document) {
          this.currentDocumentId = document.id;
          this.selectDocument(chapter, document);
        }
      } else {
        const firstChapter = chapters[0];
        const firstDocument = firstChapter?.documents?.[0];
        if (firstDocument) {
          this.currentDocumentId = firstDocument.id;
          this.selectDocument(firstChapter, firstDocument);
        }
      }
    });
  }
}
