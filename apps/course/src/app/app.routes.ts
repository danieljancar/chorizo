import { Routes } from '@angular/router';
import { CoursesComponent } from './features/home/courses/courses.component';
import { IntroductionComponent } from './features/course/introduction/introduction.component';
import { HomepageComponent } from './features/home/homepage/homepage.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'c',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'c/:courseId',
    component: IntroductionComponent,
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
