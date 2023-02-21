import { ToastMessage } from 'primereact/toast';

export type ShowToastOptions = ToastMessage | ToastMessage[];
export type ToastContextTypes = {
  showToast: (message: ShowToastOptions) => void;
};
