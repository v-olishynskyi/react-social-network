import { ILoginResponse, LoginParams, RegistrationParams } from './types';
import { firebaseAuth, firebaseDB } from '@services';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { User } from '@utils/types';
import useUsersService from '@api/services/Users';

const useAuthService = () => {
  const { getUser } = useUsersService();

  const methods = {
    login: async ({
      email,
      password,
    }: LoginParams): Promise<ILoginResponse> => {
      try {
        const userCredentias = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

        const userUid = userCredentias.user.uid;
        const token = await userCredentias.user.getIdToken();

        const user = await getUser(userUid);

        return Promise.resolve({
          token,
          user,
        });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    registration: async ({
      email,
      password,
      first_name,
      last_name,
    }: RegistrationParams) => {
      try {
        const userCredentias = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        const user = userCredentias.user;

        const data: User = {
          uid: user.uid,
          email,
          first_name,
          last_name,
          authProvider: 'email',
          avatar: '',
          fullname: `${first_name} ${last_name}`,
        };

        await addDoc(collection(firebaseDB, 'users'), data);

        return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    logout: async () => {
      try {
        await signOut(firebaseAuth);
        return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // login: async ({ email, password, isRememberMe }: LoginParams) => {
    //   await wait(3000);

    //   const user = users.find(user => {
    //     return user.email === email;
    //   });
    //   if (!user)
    //     return Promise.reject({
    //       message: 'Користувач не знайдений',
    //       code: 404,
    //     });

    //   // todo: mock password
    //   const isPasswordCorrect = password === email;

    //   if (!isPasswordCorrect)
    //     return Promise.reject({ message: 'Не вірний пароль', code: 403 });

    //   const secret = email;
    //   const expiresIn = isRememberMe ? '30d' : '2h';
    //   const token = sign({ email }, secret, {
    //     expiresIn,
    //   });

    //   return {
    //     token,
    //     user,
    //   };
    // },
    // registration: async ({
    //   confirm_password,
    //   email,
    //   first_name,
    //   last_name,
    //   password,
    // }: RegistrationParams) => {
    //   await wait(3000);

    //   const userIsAlreadyExist = !!users.find(user => user.email === email);

    //   if (userIsAlreadyExist)
    //     return Promise.reject({
    //       code: 409,
    //       message: 'Користувач з таким e-mail вже існує',
    //     });

    //   const user = {
    //     id: users.length + 1,
    //     email,
    //     fullname: `${first_name} ${last_name}`,
    //     last_name,
    //     first_name,
    //   };

    //   setUsers(oldUsers => [...oldUsers, user]);

    //   return Promise.resolve(user);
    // },
  };

  return methods;
};

export default useAuthService;
