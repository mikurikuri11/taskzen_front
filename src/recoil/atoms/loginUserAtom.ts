/* eslint-disable */
import { atom, RecoilState } from 'recoil';
import { User } from './types/index';

export const loginUserAtom: RecoilState<User> = atom({
  key: 'loginUser',
  default: { name: '', email: '' },
});
