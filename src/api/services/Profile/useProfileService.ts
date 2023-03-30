import useUsersService from '@api/services/Users';
import { firebaseAuth } from '@services';
import { updatePassword } from 'firebase/auth';

export const useProfileService = () => {
  const { getUser } = useUsersService();

  const methods = {
    refreshProfile: async (uid: string) => {
      return await getUser(uid);
    },
    changePassword: async (newPassword: string) => {
      const user = firebaseAuth.currentUser;
      console.log(
        'file: useProfileService.ts:14 - changePassword: - user:',
        user
      );

      if (!user)
        return Promise.reject({ code: 404, error: 'Користувача не знайдено' });
      return await updatePassword(user, newPassword);
    },
  };

  return methods;
};
