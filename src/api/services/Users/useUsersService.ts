import { firebaseDB } from '@services';
import { User } from '@utils/types';
import { doc, getDoc } from 'firebase/firestore';

export const useUsersService = () => {
  const methods = {
    getUser: async (uid: string) => {
      try {
        const userDoc = await getDoc(doc(firebaseDB, 'users', uid));

        if (!userDoc.exists()) {
          return Promise.reject({
            code: 404,
            message: 'Користувач не знайдений',
          });
        }

        return Promise.resolve(userDoc.data() as User);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };

  return methods;
};
