/* eslint-disable */
import { atom, RecoilState } from 'recoil';

export const showTodoModalAtom: RecoilState<boolean> = atom({
  key: 'showTodoModal',
  default: false,
});
