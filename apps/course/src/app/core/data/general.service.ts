import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private afs: AngularFirestore) {}

  getMainDoc() {
    return this.afs.collection('general').doc('main').valueChanges();
  }
}
