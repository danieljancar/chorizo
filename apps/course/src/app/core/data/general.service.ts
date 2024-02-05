import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private GENERAL_COLLECTION = 'general';
  private MAIN_DOCUMENT = 'main';

  constructor(private afs: AngularFirestore) {}

  getMainDoc() {
    return this.afs
      .collection(this.GENERAL_COLLECTION)
      .doc(this.MAIN_DOCUMENT)
      .valueChanges();
  }
}
