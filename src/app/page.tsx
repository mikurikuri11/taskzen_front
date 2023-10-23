import Link from 'next/link'
import { PurpleButton } from '@/components/ui/Button/PurpleButton'
import { LoginModal } from '@/components/ui/Modal/LoginModal'

export default function Home() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='text-2xl font-semibold text-white mb-10'>
        あなたの日々の生活に７つの習慣を取り入れてみましょう。きっと生活が豊かになります。
      </div>
      <div className='flex'>
        <PurpleButton>Log in</PurpleButton>
        <Link
          href='/'
          passHref
          className='rounded-md px-3 text-lg font-semibold text-white hover:text-gray-300 pt-3 ml-4'
        >
          学んでみる
        </Link>
        <LoginModal />
      </div>
    </div>
  )
}
