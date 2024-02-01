import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { AuthService } from '../../core/auth.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-navbar-courses-overview',
  templateUrl: './navbar-courses-overview.component.html',
  styleUrls: ['./navbar-courses-overview.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    AsyncPipe,
  ],
})
export class NavbarCoursesOverviewComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/a/login']).then(() => {
        this.toastService.showToast('Logged out successfully', 'success');
      });
    });
  }
}
