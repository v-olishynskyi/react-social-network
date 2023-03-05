import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { IUserResponse } from '@api/services/Users';
import { ApiError } from '@utils/types';
import useProfileService from '@api/services/Profile';
import { useToastContext } from '@context';
import authAtom from '@store/auth';

export const useRefreshProfile = () => {
  const queryKey = ['profile'];
  const [authState, setAuthState] = useRecoilState(authAtom);
  const { refreshProfile } = useProfileService();
  const { showToast } = useToastContext();

  return useQuery<IUserResponse, ApiError>({
    queryKey,
    queryFn: () => refreshProfile(authState.user!.uid),
    enabled: !!authState.user?.uid,
    onSuccess: response => {
      setAuthState(prev => ({ ...prev, user: response }));
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
