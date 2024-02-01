import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afa: AngularFireAuth) {}

  async login(email: string, password: string) {
    return this.afa.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.afa.signOut();
  }
}
