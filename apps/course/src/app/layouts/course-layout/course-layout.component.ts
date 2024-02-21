import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarCourseComponent } from '../../shared/navigation/navbar-course/navbar-course.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/navigation/footer/footer.component';
import { LoadingBarsComponent } from '../../shared/feedback/loading-bars/loading-bars.component';
import { CourseStateService } from '../../core/data/course-state.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  standalone: true,
  styles: [],
  imports: [
    NavbarCourseComponent,
    RouterOutlet,
    FooterComponent,
    LoadingBarsComponent,
  ],
})
export class CourseLayoutComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private courseStateService: CourseStateService,
    private route: ActivatedRoute,
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        const courseId = params.get('courseId');
        if (courseId) {
          this.courseStateService.setCurrentCourse(courseId);
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
