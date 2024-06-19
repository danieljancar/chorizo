import { Injectable } from '@angular/core';
import { LegalDocument } from '../../types/legal.type';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LegalService {
  constructor(private firestore: AngularFirestore) {}

  getLegalDocuments(): Observable<LegalDocument[]> {
    return this.firestore
      .collection<LegalDocument>('legal')
      .valueChanges({ idField: 'id' });
  }

  getLegalDocumentById(id: string): Observable<LegalDocument | undefined> {
    return this.firestore
      .collection<LegalDocument>('legal')
      .doc<LegalDocument>(id)
      .valueChanges()
      .pipe(map((document) => document ?? undefined));
  }
}
