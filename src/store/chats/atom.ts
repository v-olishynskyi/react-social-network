import { IChats } from '@store/chats/types';
import { atom } from 'recoil';

const initialState: IChats = {
  list: [],
  activeChat: '',
};

const chatsAtom = atom<IChats>({
  key: 'chats',
  default: initialState,
});

export default chatsAtom;
