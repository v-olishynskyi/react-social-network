import useProfileService from '@api/services/Profile';
import { useToastContext } from '@context';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@utils/types';

export const useChangePassword = () => {
  const { changePassword } = useProfileService();
  const { showToast } = useToastContext();

  return useMutation<any, ApiError, string>({
    mutationFn: changePassword,
    onSuccess: () => {
      showToast({
        severity: 'success',
        summary: 'Успішно',
        detail: 'Пароль успішно змінено',
      });
    },
    onError: error => {
      showToast({
        severity: 'error',
        summary: 'Щось пішло не так',
        detail: error?.message || '',
      });
    },
  });
};
