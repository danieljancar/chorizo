import { Component, OnInit } from '@angular/core';
import { NavbarCourseComponent } from '../../shared/navigation/navbar-course/navbar-course.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/navigation/footer/footer.component';
import { CourseService } from '../../core/data/course.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoadingBarsComponent } from '../../shared/feedback/loading-bars/loading-bars.component';

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
export class CourseLayoutComponent implements OnInit {
  isLoading: boolean = true;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const courseId = params.get('courseId');
          if (courseId) {
            this.courseService.setCurrentCourse(courseId);
          }
          return of(undefined);
        }),
      )
      .subscribe();
    this.courseService.getCurrentCourse().subscribe((course) => {
      this.isLoading = !course;
    });
  }
}
