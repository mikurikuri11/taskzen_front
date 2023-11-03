/* eslint-disable */
import { atom, RecoilState } from 'recoil';
import { Todo } from '@/features/todo/api/types';

export const TodoAtom: RecoilState<Todo[]> = atom<Todo[]>({
  key: 'Todo',
  default: []
});
