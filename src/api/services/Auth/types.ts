import { User } from '@utils/types';

export type LoginParams = {
  email: string;
  password: string;
  isRememberMe: boolean;
};

export interface ILoginResponse {
  token: string;
  user: User;
}

export type RegistrationParams = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export interface IRegistrationReponse {
  user: User;
}
