import { uiAtom } from './atom';
import { selector } from 'recoil';

export const themeSelector = selector({
  key: 'themeKey',
  get: ({ get }) => {
    return get(uiAtom).theme;
  },
});
