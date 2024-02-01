import { Component } from '@angular/core';
import { NavbarCoursesOverviewComponent } from '../../shared/navbar-courses-overview/navbar-courses-overview.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarCoursesOverviewComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
