import { firebaseDB } from '@services';
import { User } from '@utils/types';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useUsersService = () => {
  const methods = {
    getUserSnapshot: async (uid: string) => {
      try {
        const q = query(
          collection(firebaseDB, 'users'),
          where('uid', '==', uid)
        );
        const docs = await getDocs(q);

        return Promise.resolve(docs.docs[0]);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    getUser: async (uid: string) => {
      try {
        const snapshot = await methods.getUserSnapshot(uid);
        const userData = snapshot.data() as User;

        return Promise.resolve(userData);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };

  return methods;
};

export default useUsersService;
