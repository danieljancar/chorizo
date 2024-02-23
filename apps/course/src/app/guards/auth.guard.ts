import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ToastService } from '../core/feedback/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afa: AngularFireAuth,
    private router: Router,
    private toastService: ToastService,
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afa.authState.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/a/login']).then(() => {
            this.toastService.showToast(
              'You must be logged in to access this page.',
              'error',
            );
          });
        }
      }),
    );
  }
}
