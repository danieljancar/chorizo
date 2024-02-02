// login.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ToastService } from '../core/utility/toast.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private afa: AngularFireAuth,
    private router: Router,
    private toastService: ToastService,
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afa.authState.pipe(
      take(1),
      map((user) => !user),
      tap((notLoggedIn) => {
        if (!notLoggedIn) {
          this.router.navigate(['/']).then(() => {
            this.toastService.showToast('You are already logged in.', 'info');
          });
        }
      }),
    );
  }
}
