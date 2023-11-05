"use client";

import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil'

import { LogoutButton } from '@/components/ui/Button/LogoutButton';
import { PurpleButton } from '@/components/ui/Button/PurpleButton'
import { LoginModal } from '@/components/ui/Modal/LoginModal'
import { showLoginModalAtom } from '@/recoil/atoms/showLoginModalAtom';

export default function Home() {
  const [ showLoginModal, setShowLoginModal ] = useRecoilState(showLoginModalAtom);
  const { data: session, status } = useSession();

  const openModal = () => {
    setShowLoginModal(true);
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='text-2xl font-semibold text-white mb-10'>
        あなたの日々の生活に７つの習慣を取り入れてみましょう。きっと生活が豊かになります。
      </div>
      <div className='flex'>
        {status !== 'authenticated' ? (
          <PurpleButton
            onClick={openModal}
          >
            ログイン
          </PurpleButton>
        ) : (
          <LogoutButton />
        )}
        <Link
          href='/'
          passHref
          className='rounded-md px-3 text-lg font-semibold text-white hover:text-gray-300 pt-3 ml-4'
        >
          学んでみる
        </Link>
        <LoginModal open={showLoginModal} setOpen={setShowLoginModal} />
      </div>
    </div>
  )
}
