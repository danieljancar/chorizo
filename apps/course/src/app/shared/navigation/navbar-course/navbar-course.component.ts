import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CourseStateService } from '../../../core/course-state.service';
import { Link } from '../../../app.component';

@Component({
  selector: 'app-navbar-course',
  standalone: true,
  imports: [RouterLink, AsyncPipe, MatIcon],
  templateUrl: './navbar-course.component.html',
  styleUrls: ['./navbar-course.component.scss'],
})
export class NavbarCourseComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  private subscription: Subscription = new Subscription();
  public link: string;

  constructor(private courseStateService: CourseStateService) {
    this.link = Link.send;
  }

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        this.course = course;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
