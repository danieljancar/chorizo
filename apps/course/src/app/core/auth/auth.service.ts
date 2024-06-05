import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastService } from '../feedback/toast.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastType } from '../../types/feedback/toast.types';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isLoggedIn$: Observable<boolean> = this.afa.authState.pipe(
    map((user) => user !== null),
  );

  constructor(
    private afa: AngularFireAuth,
    private toastService: ToastService,
    private afs: AngularFirestore,
    private t: TranslateService,
  ) {}

  public async login(email: string, password: string) {
    await this.afa.signInWithEmailAndPassword(email, password);
    const message = this.t.instant('authService.login-success');
    this.toastService.showToast(message, ToastType.Success);
  }

  public async register(email: string, password: string, username: string) {
    const userCredential = await this.afa.createUserWithEmailAndPassword(
      email,
      password,
    );
    const uid = userCredential.user?.uid;
    if (uid) {
      await this.afs.collection('users').doc(uid).set({
        email,
        username,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const message = this.t.instant('authService.register-success');
      this.toastService.showToast(message, ToastType.Info);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handleAuthError(error: any): string {
    let message = this.t.instant('authService.unexpected-error');
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = this.t.instant('authService.email-already-in-use');
        break;
      case 'auth/weak-password':
        message = this.t.instant('authService.weak-password');
        break;
      case 'auth/user-disabled':
        message = this.t.instant('authService.user-disabled');
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        message = this.t.instant('authService.incorrect-email-password');
        break;
      case 'auth/too-many-requests':
        message = this.t.instant('authService.too-many-requests');
        break;
      case 'auth/invalid-credential':
        message = this.t.instant('authService.invalid-credential');
        break;
    }
    return message;
  }

  public async logout() {
    return this.afa.signOut();
  }
}
