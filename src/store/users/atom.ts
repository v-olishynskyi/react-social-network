import { User } from '@utils/types';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const usersAtom = atom<User[]>({
  key: 'users',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default usersAtom;
