import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CourseService } from '../../../core/data/course.service';
import { environment } from '../../../../environments/environment';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { AsyncPipe } from '@angular/common';
import { ToastService } from '../../../core/utility/toast.service';

@Component({
  selector: 'app-navbar-course',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar-course.component.html',
  styleUrls: ['./navbar-course.component.scss'],
})
export class NavbarCourseComponent implements OnInit {
  course$!: Observable<Course | undefined>;
  title: string = environment.metaConfig.title;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const courseId = params.get('courseId');
        if (courseId) {
          return this.courseService.getCourse(courseId);
        }
        return of(undefined);
      }),
      tap((course) => {
        if (!course) {
          this.router
            .navigate(['/'])
            .then(() =>
              this.toastService.showToast('Course was not found', 'error'),
            );
        }
      }),
    );
  }
}
