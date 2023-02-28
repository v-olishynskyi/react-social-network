import useAuthService, { RegistrationParams } from '@api/services/Auth';
import { useToastContext } from '@context';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@utils/types';

export const useRegistration = () => {
  const { showToast } = useToastContext();
  const { registration } = useAuthService();

  return useMutation<boolean, ApiError, RegistrationParams>({
    mutationFn: registration,
    onSuccess: () => {
      showToast({
        severity: 'success',
        summary: 'Успіх',
        detail: 'Реєстрація успішна',
      });
    },
    onError: (error: any) => {
      showToast({
        severity: 'error',
        summary: 'Щось пішло не так',
        detail: error.message,
      });
    },
  });
};
