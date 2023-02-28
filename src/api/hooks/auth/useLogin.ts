import useAuthService, {
  ILoginResponse,
  LoginParams,
} from '@api/services/Auth';
import { useToastContext } from '@context';
import authAtom from '@store/auth';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@utils/types';
import { useSetRecoilState } from 'recoil';

export const useLogin = () => {
  const { showToast } = useToastContext();
  const setAuth = useSetRecoilState(authAtom);
  const { login } = useAuthService();

  return useMutation<ILoginResponse, ApiError, LoginParams>({
    mutationFn: login,
    onSuccess: response => {
      setAuth(response);
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
