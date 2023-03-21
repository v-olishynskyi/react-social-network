import { IPosts } from './types';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const initialState: IPosts = [];

export const postsAtom = atom<IPosts>({
  key: 'posts',
  default: initialState,
  // effects_UNSTABLE: [persistAtom],
});
