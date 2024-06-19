import { Routes } from '@angular/router';
import { HomepageComponent } from './features/home/homepage/homepage.component';
import { CoursesComponent } from './features/home/courses/courses.component';
import { CourseIntroductionComponent } from './features/course/introduction/course-introduction.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/auth/login.guard';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { CourseLayoutComponent } from './layouts/course-layout/course-layout.component';
import { CourseAgendaComponent } from './features/course/agenda/course-agenda.component';
import { CourseTasksComponent } from './features/course/tasks/course-tasks.component';
import { CourseDocumentationComponent } from './features/course/documentation/course-documentation.component';
import { CourseResourcesComponent } from './features/course/resources/course-resources.component';
import { LegalOverviewComponent } from './features/legal/legal-overview/legal-overview.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AccountComponent } from './features/auth/account/account.component';
import { LegalDetailComponent } from './features/legal/legal-detail/legal-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomepageComponent },
      {
        path: 'c',
        component: CoursesComponent,
        canActivate: [AuthGuard],
      },
      { path: 'a', redirectTo: 'a/login', pathMatch: 'full' },
      { path: 'a/login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'l/terms', component: LegalOverviewComponent },
      { path: 'l', component: LegalOverviewComponent },
      { path: 'l/:legalId', component: LegalDetailComponent },
      {
        path: 'a/register',
        component: RegisterComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'a/account',
        component: AccountComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'c/:courseId',
    component: CourseLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CourseIntroductionComponent,
      },
      {
        path: 'agenda',
        component: CourseAgendaComponent,
      },
      {
        path: 'tasks',
        component: CourseTasksComponent,
      },
      {
        path: 'documentation',
        component: CourseDocumentationComponent,
      },
      {
        path: 'resources',
        component: CourseResourcesComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
