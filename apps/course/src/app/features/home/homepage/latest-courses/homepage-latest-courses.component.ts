import { Component } from '@angular/core';
import { CourseService } from '../../../../core/data/course.service';
import { Course } from '../../../../../../projects/types/src/lib/course.types';
import { LoadingBarsComponent } from '../../../../shared/feedback/loading-bars/loading-bars.component';
import { FeedbackMessageComponent } from '../../../../shared/feedback/feedback-message/feedback-message.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-latest-courses',
  standalone: true,
  imports: [LoadingBarsComponent, FeedbackMessageComponent, RouterLink],
  templateUrl: './homepage-latest-courses.component.html',
  styleUrl: './homepage-latest-courses.component.scss',
})
export class HomepageLatestCoursesComponent {
  public courses: Course[] = [];

  constructor(private courseService: CourseService) {
    this.courseService.getLatestCourses(2).subscribe((courses) => {
      this.courses = courses;
    });
  }
}
