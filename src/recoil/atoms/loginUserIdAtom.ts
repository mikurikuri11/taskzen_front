/* eslint-disable */
import { atom, RecoilState } from 'recoil';

type UserId = {
  id: string;
}

export const loginUserIdAtom: RecoilState<UserId> = atom({
  key: 'loginUserId',
  default: { id: "" },
});
