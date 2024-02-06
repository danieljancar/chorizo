import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../core/data/course.service';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { CoursesFilterComponent } from './filter/courses-filter.component';
import { FeedbackMessageComponent } from '../../../shared/feedback/feedback-message/feedback-message.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  imports: [
    CoursesFilterComponent,
    LoadingBarsComponent,
    RouterLink,
    FeedbackMessageComponent,
  ],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  isLoading: boolean = false;

  constructor(
    private courseService: CourseService,
    protected route: ActivatedRoute,
    protected router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || '';
      const sortBy = params['sort'] || 'createdAt';
      this.loadCourses(searchTerm, sortBy);
    });
  }

  loadCourses(searchTerm: string = '', sortBy: string = 'createdAt') {
    this.isLoading = true;
    this.courseService.getCourses(searchTerm, sortBy).subscribe((courses) => {
      this.courses = courses;
      setTimeout(() => {
        this.isLoading = false;
      }, 250);
    });
  }
}
