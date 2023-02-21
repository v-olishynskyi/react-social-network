import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ShowToastOptions, ToastContextTypes } from './types';

// create context
const ToastContext = createContext<ToastContextTypes | undefined>(undefined);

// wrap context provider to add functionality
export const ToastContextProvider: React.FC<
  React.PropsWithChildren<{ value?: ToastContextTypes }>
> = ({ children }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (options: ShowToastOptions) => {
    if (!toastRef.current) return;
    toastRef.current?.show(options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      <>{children}</>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'useToastContext have to be used within ToastContextProvider'
    );
  }

  return context;
};
