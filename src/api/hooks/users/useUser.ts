import useUsersService from '@api/services/Users';
import { IUserResponse } from '@api/services/Users';
import { useToastContext } from '@context';
import authAtom from '@store/auth';
import { useQuery, QueryKey } from '@tanstack/react-query';
import { ApiError } from '@utils/types';
import { useRecoilState } from 'recoil';

export const useUser = (uid: string, options = {}) => {
  const query_key = ['user', uid] as QueryKey;
  const { getUser } = useUsersService();
  const { showToast } = useToastContext();

  const [auth, setAuth] = useRecoilState(authAtom);

  return useQuery<any, ApiError, IUserResponse>({
    queryKey: query_key,
    queryFn: () => getUser(uid),
    onError: error => {
      showToast({
        severity: 'error',
        summary: 'Щось пішло не так',
        detail: error.message,
      });
    },
    onSuccess: response => {
      if (auth.user?.uid === response.uid) {
        setAuth(prev => ({ ...prev, user: { ...prev.user, ...response } }));
      }
    },
    ...options,
  });
};
