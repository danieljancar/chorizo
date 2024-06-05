import { Component } from '@angular/core';
import { CourseService } from '../../../../core/data/course.service';
import { Course } from '../../../../../../projects/types/src/lib/course/course.types';
import { LoadingBarsComponent } from '../../../../shared/feedback/loading-bars/loading-bars.component';
import { FeedbackMessageComponent } from '../../../../shared/feedback/feedback-message/feedback-message.component';
import { RouterLink } from '@angular/router';
import { RelativeTimePipe } from '../../../../pipes/relative-time.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-latest-courses',
  standalone: true,
  imports: [
    LoadingBarsComponent,
    FeedbackMessageComponent,
    RouterLink,
    RelativeTimePipe,
    TranslateModule,
  ],
  templateUrl: './homepage-latest-courses.component.html',
  styleUrl: './homepage-latest-courses.component.scss',
})
export class HomepageLatestCoursesComponent {
  public courses: Course[] = [];
  public isLoading = true;

  constructor(
    private courseService: CourseService,
    public t: TranslateService,
  ) {
    this.courseService.getLatestCourses(2).subscribe((courses) => {
      this.courses = courses;
      this.isLoading = false;
    });
  }
}
