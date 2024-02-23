export enum ToastType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export type Toast = {
  message: string;
  type: ToastType;
};
