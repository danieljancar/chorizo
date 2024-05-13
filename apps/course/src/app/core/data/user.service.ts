import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, Observable, of } from 'rxjs';
import { User } from '../../../../projects/types/src/lib/user.types';
import { switchMap } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = this.afa.authState.pipe(
    switchMap((user) => {
      if (user) {
        return this.afs
          .collection('users')
          .doc<User>(user.uid)
          .valueChanges({ idField: 'id' });
      } else {
        return of(null);
      }
    }),
  );

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) {}

  public getCurrentUser(): Observable<User | null | undefined> {
    return this.afa.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection('users')
            .doc<User>(user.uid)
            .valueChanges();
        } else {
          return of(null);
        }
      }),
    );
  }

  public async updateUser(userData: User): Promise<void> {
    userData.updatedAt = new Timestamp(new Date().getTime() / 1000, 0);
    const currentUser = await this.afa.currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      await this.afs.collection('users').doc(uid).update(userData);
    }
  }

  public async updateUserAvatar(file: File): Promise<void> {
    const uid = (await this.afa.currentUser)?.uid;
    const filePath = `users/avatars/${uid}/${Date.now()}_${file.name}`;
    const updatedAt = new Timestamp(new Date().getTime() / 1000, 0);

    await this.storage
      .upload(filePath, file)
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          await this.afs
            .collection('users')
            .doc(uid)
            .update({ avatar: filePath, updatedAt: updatedAt });
        }),
      )
      .toPromise();
  }
}
