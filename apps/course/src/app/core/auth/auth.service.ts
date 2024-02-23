import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastService } from '../feedback/toast.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastType } from '../../types/feedback/toast.types';

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
  ) {}

  public async login(email: string, password: string) {
    await this.afa.signInWithEmailAndPassword(email, password);
    this.toastService.showToast('Logged in successfully.', ToastType.Success);
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
      this.toastService.showToast('Registered successfully.', ToastType.Info);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handleAuthError(error: any): string {
    let message = 'An unexpected error occurred, please try again.';
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already in use, please try another.';
        break;
      case 'auth/weak-password':
        message = 'The password is too weak, please try a stronger password.';
        break;
      case 'auth/user-disabled':
        message =
          'This user has been disabled. Please contact support for more information.';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        message = 'Incorrect email or password, please try again.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many requests. Please try again later.';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid credentials. Please try again.';
        break;
    }
    return message;
  }

  public async logout() {
    return this.afa.signOut();
  }
}
