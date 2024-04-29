import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../../../../projects/types/src/lib/course/course.types';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CourseStateService } from '../../../core/course-state.service';

@Component({
  selector: 'app-navbar-course',
  standalone: true,
  imports: [RouterLink, AsyncPipe, MatIcon],
  templateUrl: './navbar-course.component.html',
  styleUrls: ['./navbar-course.component.scss'],
})
export class NavbarCourseComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  isDropdownOpen: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private courseStateService: CourseStateService) {}

  ngOnInit(): void {
    this.subscription = this.courseStateService.currentCourse$.subscribe(
      (course) => {
        this.course = course;
      },
    );
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
