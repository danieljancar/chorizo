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
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { ToastService } from '../../core/toast.service';
import { GeneralService } from '../../core/general.service';
import { General } from '../../../../projects/types/src/lib/general.types';

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
  mainDocument$: Observable<General | undefined>;
  isLoading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private generalService: GeneralService,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.mainDocument$ = this.generalService.getMainDocument().pipe(
      catchError((error) => {
        this.error$.next(error.message);
        return of(undefined);
      }),
      finalize(() => this.isLoading$.next(false)),
    );
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/a/login']).then(() => {
        this.toastService.showToast('Logged out successfully', 'success');
      });
    });
  }
}
