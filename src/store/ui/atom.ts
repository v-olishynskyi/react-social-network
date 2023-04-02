import { IUi } from './types';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const initialValue: IUi = {
  theme: 'light',
};

export const uiAtom = atom<IUi>({
  key: 'ui',
  default: initialValue,
  effects_UNSTABLE: [persistAtom],
});
