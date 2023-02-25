import { LoginParams, RegistrationParams } from './types';
import { wait } from '@utils/helpers';
// @ts-ignore
import sign from 'jwt-encode';
import { useRecoilState } from 'recoil';
import usersAtom from '@store/users';

const useAuthService = () => {
  const [users, setUsers] = useRecoilState(usersAtom);

  const methods = {
    login: async ({ email, password, isRememberMe }: LoginParams) => {
      await wait(3000);

      const user = users.find(user => {
        return user.email === email;
      });
      if (!user)
        return Promise.reject({
          message: 'Користувач не знайдений',
          code: 404,
        });

      // todo: mock password
      const isPasswordCorrect = password === email;

      if (!isPasswordCorrect)
        return Promise.reject({ message: 'Не вірний пароль', code: 403 });

      const secret = email;
      const expiresIn = isRememberMe ? '30d' : '2h';
      const token = sign({ email }, secret, {
        expiresIn,
      });

      return {
        token,
        user,
      };
    },
    logout: async () => {
      await wait(2000);

      return Promise.resolve(true);
    },
    registration: async ({
      confirm_password,
      email,
      first_name,
      last_name,
      password,
    }: RegistrationParams) => {
      await wait(3000);

      const userIsAlreadyExist = !!users.find(user => user.email === email);

      if (userIsAlreadyExist)
        return Promise.reject({
          code: 409,
          message: 'Користувач з таким e-mail вже існує',
        });

      const user = {
        id: users.length + 1,
        email,
        fullname: `${first_name} ${last_name}`,
        last_name,
        first_name,
      };

      setUsers(oldUsers => [...oldUsers, user]);

      return Promise.resolve(user);
    },
  };

  return methods;
};

export default useAuthService;
