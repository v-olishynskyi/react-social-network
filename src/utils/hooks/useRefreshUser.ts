import { isAuthenticatedSelector } from '@store/auth';
import authAtom from '@store/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useUser } from '@api/hooks/users';

export const useRefreshUser = async () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { data, isLoading } = useUser(auth.user?.uid || '', {
    enabled: isAuthenticated,
  });
  console.log('file: useRefreshUser.ts:10 - useRefreshUser - data:', data);

  if (!isAuthenticated) return;

  // const response = await
};
