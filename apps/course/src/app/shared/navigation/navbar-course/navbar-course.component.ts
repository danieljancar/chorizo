import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CourseService } from '../../../core/data/course.service';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-course',
  standalone: true,
  imports: [RouterLink, AsyncPipe, MatIcon],
  templateUrl: './navbar-course.component.html',
  styleUrls: ['./navbar-course.component.scss'],
})
export class NavbarCourseComponent implements OnInit {
  courseId: string | null = null;
  course$: Observable<Course | undefined>;
  private destroy$ = new Subject<void>();

  constructor(private courseService: CourseService) {
    this.course$ = new Observable();
  }

  ngOnInit(): void {
    this.course$ = this.courseService.getCurrentCourse();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
