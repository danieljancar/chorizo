import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageLoaderService {
  constructor(private storage: AngularFireStorage) {}

  async getDownloadUrl(path: string): Promise<string> {
    const ref = this.storage.ref(path);
    const url = await ref.getDownloadURL().toPromise();
    return `${url}?timestamp=${new Date().getTime()}`;
  }
}
