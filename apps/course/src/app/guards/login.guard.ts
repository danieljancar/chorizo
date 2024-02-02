// login.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private afa: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afa.authState.pipe(
      take(1),
      map((user) => !user), // Invert the boolean, true if auth is NOT logged in
      tap((notLoggedIn) => {
        if (!notLoggedIn) {
          this.router.navigate(['/']); // Redirect to homepage or another route if the auth is already logged in
        }
      }),
    );
  }
}
