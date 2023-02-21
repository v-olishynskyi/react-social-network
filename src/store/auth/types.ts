import { User } from '@utils/types';

export interface IAuth {
  token: string | null;
  user: User;
}
