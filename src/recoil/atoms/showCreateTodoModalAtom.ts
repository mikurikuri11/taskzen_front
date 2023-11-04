/* eslint-disable */
import { atom, RecoilState } from 'recoil';

export const showCreateTodoModalAtom: RecoilState<boolean> = atom({
  key: 'showCreateTodoModal',
  default: false,
});
