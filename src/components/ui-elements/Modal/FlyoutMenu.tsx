import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { FC, Fragment, useState } from 'react'

export const FlyoutMenu: FC = () => {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const handleItemClick = () => {
    setIsOpen(false)
  }

  return (
    <Popover className='relative' as='div'>
      <Popover.Button
        className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-none cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            width={55}
            height={55}
            alt=''
            className='rounded-full'
          />
        ) : (
          <div className='w-14 h-14 rounded-full bg-gray-300' />
        )}
      </Popover.Button>

      <Transition
        show={isOpen}
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel
          className='absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4'
          static
        >
          <div className='w-40 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
            <Link
              onClick={handleItemClick}
              className='block p-2 hover:text-indigo-600'
              href='/notification'
              passHref
            >
              通知設定
            </Link>
            <Link
              onClick={handleItemClick}
              className='block p-2 hover:text-indigo-600'
              href='/category-setting'
              passHref
            >
              カテゴリー設定
            </Link>
            <div
              className='block p-2 hover:text-indigo-600 hover:cursor-pointer'
              onClick={() => {
                signOut()
                handleItemClick()
              }}
            >
              ログアウト
            </div>
            <div
              className='block p-2 hover:text-red-600 text-red-500 hover:cursor-pointer'
              onClick={handleItemClick}
            >
              退会する
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
