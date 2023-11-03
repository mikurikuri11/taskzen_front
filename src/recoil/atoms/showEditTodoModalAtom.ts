/* eslint-disable */
import { atom, RecoilState } from 'recoil';

export const showEditTodoModalAtom: RecoilState<boolean> = atom({
  key: 'showEditTodoModal',
  default: false,
});
