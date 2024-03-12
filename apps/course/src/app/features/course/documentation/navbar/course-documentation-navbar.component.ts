import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  Course,
  CourseChapter,
  CourseDocument,
} from '../../../../../../projects/types/src/lib/course.types';
import { Subscription } from 'rxjs';
import { CourseService } from '../../../../core/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseStateService } from '../../../../core/course-state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-course-documentation-navbar',
  standalone: true,
  imports: [MatIcon, RouterLink, NgClass],
  templateUrl: './course-documentation-navbar.component.html',
  styleUrl: './course-documentation-navbar.component.scss',
})
export class CourseDocumentationNavbarComponent implements OnInit, OnDestroy {
  public course: Course | undefined;
  public chapters: CourseChapter[] | undefined;
  public isLoading: boolean = true;
  @Output() documentSelected: EventEmitter<CourseDocument> =
    new EventEmitter<CourseDocument>();
  private subscription: Subscription = new Subscription();
  private courseService = inject(CourseService);
  private courseStateService = inject(CourseStateService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.subscription = this.courseService
      .getCourseChapters(this.courseStateService.currentCourseId)
      .subscribe((chapters) => {
        if (chapters.length > 0) {
          this.chapters = chapters;
          for (const chapter of chapters) {
            this.subscription = this.courseService
              .getCourseChapterDocuments(
                this.courseStateService.currentCourseId,
                chapter.id,
              )
              .subscribe((documents) => {
                if (documents.length > 0) {
                  chapter.documents = documents;
                }
              });
          }
        }
      });
    this.isLoading = false;
  }

  public selectDocument(chapter: CourseChapter, documentId: string): void {
    const document = chapter.documents.find((doc) => doc.id === documentId);

    if (document) {
      this.router
        .navigate([
          'c',
          this.courseStateService.currentCourseId,
          'documentation',
          chapter.id,
          document.id,
        ])
        .then(() => {
          this.documentSelected.emit(document);
        })
        .catch((reason) => {
          console.error('Routing failed:', reason);
        });
    } else {
      console.error('Document not found');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
