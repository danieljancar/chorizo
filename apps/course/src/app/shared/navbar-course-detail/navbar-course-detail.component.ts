import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-course-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-course-detail.component.html',
  styleUrl: './navbar-course-detail.component.scss',
})
export class NavbarCourseDetailComponent {
  title: string = environment.metaConfig.title;
}
