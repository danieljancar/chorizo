import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;

  constructor(private afa: AngularFireAuth) {
    this.isLoggedIn$ = this.afa.authState.pipe(map((user) => user !== null));
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const user = await this.afa.currentUser;
      return user !== null;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    return this.afa.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.afa.signOut();
  }
}
