import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageLoaderService {
  constructor(private storage: AngularFireStorage) {}

  async getDownloadUrl(path: string): Promise<string> {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL().toPromise();
  }
}
