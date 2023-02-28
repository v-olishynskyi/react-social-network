import authAtom from './';
import { selector } from 'recoil';

const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelectorKey',
  get: ({ get }) => {
    return !!get(authAtom).token;
  },
});

const userSelector = selector({
  key: 'userSelectorKey',
  get: ({ get }) => {
    const userFromAtom = get(authAtom).user;

    return userFromAtom || null;
  },
});

export { isAuthenticatedSelector, userSelector };
