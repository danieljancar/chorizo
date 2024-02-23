import { Injectable } from '@angular/core';
import { Toast, ToastType } from '../../types/feedback/toast.types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];

  constructor() {}

  getToasts(): Toast[] {
    return this.toasts;
  }

  showToast(message: string, type: ToastType): Toast[] {
    const toast: Toast = { message, type };

    const maxToasts = 1;

    if (this.toasts.length >= maxToasts) {
      this.toasts.shift();
    }

    this.toasts.push(toast);

    setTimeout(() => this.removeToast(toast), 5000);
    return this.toasts;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private removeToast(toast: Toast): Toast[] {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
    return this.toasts;
  }
}
