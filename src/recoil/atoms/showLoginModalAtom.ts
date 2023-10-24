/* eslint-disable */
import { atom, RecoilState } from 'recoil';

export const showFoodModalAtom: RecoilState<boolean> = atom({
  key: 'showFoodModal',
  default: false,
});
