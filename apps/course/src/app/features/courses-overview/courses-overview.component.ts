import { Component } from '@angular/core';
import { NavbarCoursesOverviewComponent } from '../../shared/navbar-courses-overview/navbar-courses-overview.component';

@Component({
  selector: 'app-courses-overview',
  standalone: true,
  imports: [NavbarCoursesOverviewComponent],
  templateUrl: './courses-overview.component.html',
  styleUrl: './courses-overview.component.scss',
})
export class CoursesOverviewComponent {}
