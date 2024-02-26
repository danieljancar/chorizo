import { Component } from '@angular/core';
import { CourseService } from '../../../../core/course.service';
import { Course } from '../../../../../../projects/types/src/lib/course.types';
import { LoadingBarsComponent } from '../../../../shared/feedback/loading-bars/loading-bars.component';
import { FeedbackMessageComponent } from '../../../../shared/feedback/feedback-message/feedback-message.component';
import { RouterLink } from '@angular/router';
import { RelativeTimePipe } from '../../../../pipes/relative-time.pipe';

@Component({
  selector: 'app-latest-courses',
  standalone: true,
  imports: [
    LoadingBarsComponent,
    FeedbackMessageComponent,
    RouterLink,
    RelativeTimePipe,
  ],
  templateUrl: './homepage-latest-courses.component.html',
  styleUrl: './homepage-latest-courses.component.scss',
})
export class HomepageLatestCoursesComponent {
  public courses: Course[] = [];
  public isLoading = true;

  constructor(private courseService: CourseService) {
    this.courseService.getLatestCourses(2).subscribe((courses) => {
      this.courses = courses;
      this.isLoading = false;
    });
  }
}
