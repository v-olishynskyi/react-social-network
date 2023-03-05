import { IAuth } from './types';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const initialState: IAuth = {
  token: null,
  user: null,
};

export const authAtom = atom<IAuth>({
  key: 'auth',
  default: initialState,
  effects_UNSTABLE: [persistAtom],
});
