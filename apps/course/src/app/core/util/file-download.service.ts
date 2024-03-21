import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { saveAs } from 'file-saver';
import { ToastService } from '../feedback/toast.service';
import { ToastType } from '../../types/feedback/toast.types';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  constructor(
    private storage: AngularFireStorage,
    private toastService: ToastService,
  ) {}

  downloadFile(filePath: string): void {
    const ref = this.storage.ref(filePath);
    ref.getDownloadURL().subscribe(
      (url) => {
        saveAs(url, filePath.split('/').pop());
      },
      () => {
        this.toastService.showToast('Error downloading file', ToastType.Error);
      },
    );
  }
}
