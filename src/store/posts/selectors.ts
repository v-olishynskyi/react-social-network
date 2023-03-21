import { postsAtom } from '@store/posts/atom';
import { selector } from 'recoil';

export const postsSelector = selector({
  key: 'postsSelectorKey',
  get: ({ get }) => {
    return get(postsAtom);
  },
});
