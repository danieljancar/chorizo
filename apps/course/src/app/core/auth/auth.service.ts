import { Injectable } from '@angular/core';
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
    this.toastService.showToast('Logged in successfully.', 'success');
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
      this.toastService.showToast('Registered successfully.', 'success');
    }
  }

  public getCurrentUser(): Promise<User | null> {
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

  public async emailExists(email: string): Promise<boolean> {
    const signInMethods = await this.afa.fetchSignInMethodsForEmail(email);
    return signInMethods.length > 0;
  }

  public async logout() {
    return this.afa.signOut();
  }

  public async updateUser(userData: User): Promise<void> {
    const currentUser = await this.afa.currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      await this.afs.collection('users').doc(uid).update(userData);
    }
  }
}
