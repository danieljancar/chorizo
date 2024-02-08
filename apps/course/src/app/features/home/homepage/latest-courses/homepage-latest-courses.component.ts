import { Component } from '@angular/core';
import { CourseService } from '../../../../core/data/course.service';
import { Course } from '../../../../../../projects/types/src/lib/course.types';
import { LoadingBarsComponent } from '../../../../shared/feedback/loading-bars/loading-bars.component';
import { FeedbackMessageComponent } from '../../../../shared/feedback/feedback-message/feedback-message.component';
import { RouterLink } from '@angular/router';
import { CoursesComponent } from '../../courses/courses.component';

@Component({
  selector: 'app-latest-courses',
  standalone: true,
  imports: [LoadingBarsComponent, FeedbackMessageComponent, RouterLink, CoursesComponent],
  templateUrl: './homepage-latest-courses.component.html',
  styleUrl: './homepage-latest-courses.component.scss',
  providers: [CoursesComponent]
})
export class HomepageLatestCoursesComponent {
  public courses: Course[] = [];
  public date: any = null;
  public isLoading = true;


  constructor(
    private courseService: CourseService,
    private coursComp: CoursesComponent
    ) {
    this.courseService.getLatestCourses(2).subscribe((courses) => {
      this.courses = courses;
      this.isLoading = false;
    });

    this.date = coursComp.customTimestamp;
  }
}
