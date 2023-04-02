import chatsAtom from './/atom';
import { selector } from 'recoil';

export const сhatsSelector = selector({
  key: 'chatsSelectorKey',
  get: ({ get }) => get(chatsAtom).list,
});

export const activeChatSelector = selector({
  key: 'activeChatSelectorKey',
  get: ({ get }) => get(chatsAtom).activeChat,
});
