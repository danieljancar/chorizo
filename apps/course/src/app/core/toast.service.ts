import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: any[] = [];

  constructor() {}

  getToasts() {
    return this.toasts;
  }

  showToast(
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
  ) {
    const toast = { message, type };
    this.toasts.push(toast);

    setTimeout(() => this.removeToast(toast), 5000);
  }

  private removeToast(toast: any) {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }
}
