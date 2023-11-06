/* eslint-disable */
import { atom, RecoilState } from 'recoil'

export const showLoginModalAtom: RecoilState<boolean> = atom({
  key: 'showLoginModal',
  default: false,
})
