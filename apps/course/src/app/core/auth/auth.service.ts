import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastService } from '../utility/toast.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../../../projects/types/src/lib/user.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private afa = inject(AngularFireAuth);
  isLoggedIn$: Observable<boolean> = this.afa.authState.pipe(
    map((user) => user !== null),
  );
  private toastService = inject(ToastService);
  private afs = inject(AngularFirestore);

  async login(email: string, password: string) {
    await this.afa.signInWithEmailAndPassword(email, password);
    this.toastService.showToast('Logged in successfully.', 'success');
  }

  async register(email: string, password: string, username: string) {
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
      this.toastService.showToast('Registered successfully.', 'success');
    }
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      this.afa
        .onAuthStateChanged((user) => {
          if (user) {
            this.afs
              .collection('users')
              .doc(user.uid)
              .get()
              .subscribe((userDoc) => {
                const user = userDoc.data() as User;
                resolve(user);
              });
          } else {
            resolve(null);
          }
        })
        .then((r) => r);
    });
  }

  async emailExists(email: string): Promise<boolean> {
    const signInMethods = await this.afa.fetchSignInMethodsForEmail(email);
    return signInMethods.length > 0;
  }

  async logout() {
    return this.afa.signOut();
  }
}
