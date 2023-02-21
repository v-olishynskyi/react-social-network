import useAuthService from '@api/services/Auth';
import { useToastContext } from '@context';
import authAtom, { IAuth } from '@store/auth';
import { useMutation } from '@tanstack/react-query';
import { ApiError, User } from '@utils/types';
import { useSetRecoilState } from 'recoil';

export const useLogout = () => {
  const { showToast } = useToastContext();
  const setAuth = useSetRecoilState<IAuth>(authAtom);
  const { logout } = useAuthService();

  return useMutation<boolean, ApiError>({
    mutationFn: logout,
    onSuccess: () => {
      setAuth({ token: null, user: {} as User });
    },
    onError: error => {
      showToast({
        severity: 'error',
        summary: 'Щось пішло не так',
        detail: error.message,
      });
    },
  });
};
