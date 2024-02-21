import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const maxToasts = 1;

    if (this.toasts.length >= maxToasts) {
      this.toasts.shift();
    }

    this.toasts.push(toast);

    setTimeout(() => this.removeToast(toast), 5000);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private removeToast(toast: any) {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }
}
