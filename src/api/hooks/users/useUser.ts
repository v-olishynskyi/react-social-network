import useUsersService from '@api/services/Users';
import { IUserResponse } from '@api/services/Users';
import { useToastContext } from '@context';
import { useQuery, QueryKey } from '@tanstack/react-query';
import { ApiError } from '@utils/types';

export const useUser = (uid: string, options = {}) => {
  const query_key = ['user', uid] as QueryKey;
  const { getUser } = useUsersService();
  const { showToast } = useToastContext();

  return useQuery<IUserResponse, ApiError, string>({
    queryKey: query_key,
    queryFn: () => getUser(uid),
    onError: error => {
      showToast({
        severity: 'error',
        summary: 'Щось пішло не так',
        detail: error.message,
      });
    },
    ...options,
  });
};
