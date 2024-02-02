import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { General } from 'types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private static readonly GENERAL_COLLECTION_NAME = 'general';
  private static readonly MAIN_DOCUMENT_NAME = 'main';

  constructor(private afs: AngularFirestore) {}

  getMainDocument(): Observable<General | undefined> {
    return this.afs
      .collection<General>(GeneralService.GENERAL_COLLECTION_NAME)
      .doc(GeneralService.MAIN_DOCUMENT_NAME)
      .valueChanges();
  }
}
