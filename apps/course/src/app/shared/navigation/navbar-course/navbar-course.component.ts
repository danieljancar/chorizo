import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-course',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-course.component.html',
  styleUrl: './navbar-course.component.scss',
})
export class NavbarCourseComponent {
  title: string = environment.metaConfig.title;
}
