export type Toast = {
  message: string;
  type: ToastType;
};

export type ToastType = 'info' | 'success' | 'warning' | 'error';
