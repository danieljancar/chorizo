import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToastService } from './core/utility/toast.service';
import { NgClass } from '@angular/common';
import { NavbarCourseComponent } from './shared/navbar-course/navbar-course.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    NavbarCourseComponent,
    NavbarComponent,
    MatIcon,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showCoursesNavbar: boolean = false;

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
