import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ToastService } from '../../core/feedback/toast.service';
import { ToastType } from '../../types/feedback/toast.types';
import { User } from '../../../../projects/types/src/lib/user.types';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastService: ToastService,
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afa.authState.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection('users')
            .doc(user.uid)
            .valueChanges()
            .pipe(
              // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'unknown'.
              take(1),
              map((userData: User) => {
                if (
                  userData &&
                  (userData.role === 'user' || userData.role === 'admin')
                ) {
                  return true;
                } else {
                  this.toastService.showToast(
                    'You must be a verified user to access this page.',
                    ToastType.Info,
                  );
                  return false;
                }
              }),
            );
        } else {
          this.toastService.showToast(
            'You must be logged in to access this page.',
            ToastType.Info,
          );
          return of(false);
        }
      }),
      tap((allowed) => {
        if (!allowed) {
          this.router.navigate(['/a/login']);
        }
      }),
    );
  }
}
