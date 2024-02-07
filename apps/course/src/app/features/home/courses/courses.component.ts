import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../core/data/course.service';
import { Course } from '../../../../../projects/types/src/lib/course.types';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { CoursesFilterComponent } from './filter/courses-filter.component';
import { FeedbackMessageComponent } from '../../../shared/feedback/feedback-message/feedback-message.component';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';

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
    private titleService: Title,
  ) {
    this.titleService.setTitle(
      'Courses - ' +
        environment.metaConfig.title +
        ' - ' +
        AppComponent.chorizo.title,
    );
  }

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

  convertTimestamp(timestamp: any) {
    let date = timestamp.toDate();
    let mm = date.getMonth();
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dezember"]
  
    date =  dd + '. ' + month[mm] + ' ' + yyyy;
    return date;
  }
}
