import { IAuth } from './types';
import { User } from '@utils/types';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const initialState: IAuth = {
  token: null,
  user: {} as User,
};

const authAtom = atom({
  key: 'auth',
  default: initialState,
  effects_UNSTABLE: [persistAtom],
});

export default authAtom;
