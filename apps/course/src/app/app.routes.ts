import { Routes } from '@angular/router';
import { HomepageComponent } from './features/home/homepage/homepage.component';
import { CoursesComponent } from './features/home/courses/courses.component';
import { IntroductionComponent } from './features/course/introduction/introduction.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { CourseLayoutComponent } from './layouts/course-layout/course-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'c', component: CoursesComponent, canActivate: [AuthGuard] },
      { path: 'a/login', component: LoginComponent, canActivate: [LoginGuard] },
    ],
  },
  {
    path: 'c/:courseId',
    component: CourseLayoutComponent,
    children: [{ path: '', component: IntroductionComponent }],
  },
  { path: '**', redirectTo: '' },
];
