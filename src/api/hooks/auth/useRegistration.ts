import useAuthService, { RegistrationParams } from '@api/services/Auth';
import { useToastContext } from '@context';
import { useMutation } from '@tanstack/react-query';
import { ApiError, User } from '@utils/types';

export const useRegistration = () => {
  const { showToast } = useToastContext();
  const { registration } = useAuthService();

  return useMutation<User, ApiError, RegistrationParams>({
    mutationFn: registration,
    onSuccess: response => {},
    onError: error => {
      showToast({
        severity: 'error',
        summary: 'Щось пішло не так',
        detail: error.message,
      });
    },
  });
};
