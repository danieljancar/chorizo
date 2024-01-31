import { Routes } from '@angular/router';
import { CoursesOverviewComponent } from './features/courses-overview/courses-overview.component';
import { CourseDetailComponent } from './features/course-detail/course-detail.component';
import { HomepageComponent } from './features/homepage/homepage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'c',
    component: CoursesOverviewComponent,
  },
  {
    path: 'c/:courseId',
    component: CourseDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
