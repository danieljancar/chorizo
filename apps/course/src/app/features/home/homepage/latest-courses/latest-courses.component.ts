import { Component } from '@angular/core';
import { CourseService } from '../../../../core/data/course.service';
import { Course } from '../../../../../../projects/types/src/lib/course.types';
import { LoadingBarsComponent } from '../../../../shared/loading-bars/loading-bars.component';
import { FeedbackMessageComponent } from '../../../../shared/feedback-message/feedback-message.component';

@Component({
  selector: 'app-latest-courses',
  standalone: true,
  imports: [LoadingBarsComponent, FeedbackMessageComponent],
  templateUrl: './latest-courses.component.html',
  styleUrl: './latest-courses.component.scss',
})
export class LatestCoursesComponent {
  public courses: Course[] = [];

  constructor(private courseService: CourseService) {
    this.courseService.getLatestCourses(4).subscribe((courses) => {
      this.courses = courses;
    });
  }
}
