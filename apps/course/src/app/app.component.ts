import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToastService } from './core/toast.service';
import { NgClass } from '@angular/common';
import { NavbarCourseDetailComponent } from './shared/navbar-course-detail/navbar-course-detail.component';
import { NavbarCoursesOverviewComponent } from './shared/navbar-courses-overview/navbar-courses-overview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    NavbarCourseDetailComponent,
    NavbarCoursesOverviewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showCoursesNavbar = false;

  constructor(
    public toastService: ToastService,
    private router: Router,
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        this.showCoursesNavbar = event.urlAfterRedirects.startsWith('/c/');
      });
  }
}
