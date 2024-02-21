import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastService } from '../utility/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private afa: AngularFireAuth,
    private toastService: ToastService,
  ) {
    this.isLoggedIn$ = this.afa.authState.pipe(map((user) => user !== null));
  }

  async login(email: string, password: string) {
    return this.afa
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastService.showToast('Logged in successfully.', 'success');
      })
      .catch(() => {
        this.toastService.showToast(
          "Couldn't log in, please try again.",
          'error',
        );
      });
  }

  async logout() {
    return this.afa.signOut();
  }
}
