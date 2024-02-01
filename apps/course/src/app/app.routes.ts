import { Routes } from '@angular/router';
import { CoursesOverviewComponent } from './features/courses-overview/courses-overview.component';
import { CourseDetailComponent } from './features/course-detail/course-detail.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { LoginComponent } from './features/user/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'c',
    component: CoursesOverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'c/:courseId',
    component: CourseDetailComponent,
  },
  {
    path: 'a/login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
