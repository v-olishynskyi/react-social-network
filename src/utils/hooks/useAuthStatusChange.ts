import useUsersService from '@api/services/Users';
import { useToastContext } from '@context';
import { firebaseAuth } from '@services';
import authAtom from '@store/auth';
import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { useSetRecoilState } from 'recoil';

export const useAuthStateChange = () => {
  const [loading, setLoading] = React.useState(true);

  const { showToast } = useToastContext();
  const { getUser } = useUsersService();
  const setAuth = useSetRecoilState(authAtom);

  React.useEffect(() => {
    onAuthStateChanged(firebaseAuth, async firebaseUser => {
      try {
        if (!firebaseUser) return setLoading(false);

        const user = await getUser(firebaseUser.uid);
        const token = await firebaseUser.getIdToken();
        setAuth({ token, user });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showToast({ severity: 'error', summary: 'Щось пішло не так' });
      }
    });
  }, []);

  return { loading };
};
