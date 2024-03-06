import { Popover } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { FC, useState } from 'react'

const Items = [
  { href: '/tutorial', text: 'チュートリアル' },
  { href: '/todos', text: 'ToDo' },
  { href: '/category-setting', text: 'カテゴリー' },
  { href: '/report', text: 'レポート' },
];

export const FlyoutMenu: FC = () => {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover width={200} position='bottom' withArrow shadow='md' opened={isOpen} onClose={() => setIsOpen(false)}>
      <Popover.Target>
        {session?.user?.image ? (
          <Image
            onClick={() => setIsOpen(!isOpen)}
            src={session?.user?.image}
            width={50}
            height={50}
            alt=''
            className='rounded-full'
          />
        ) : (
          <div className='w-14 h-14 rounded-full bg-gray-300' />
        )}
      </Popover.Target>
      <Popover.Dropdown>
        <div className='w-40 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
          {Items.map((item, index) => (
            <Link
              key={index}
              onClick={() => setIsOpen(!isOpen)}
              className='block p-2 text-black hover:text-indigo-600 no-underline'
              href={item.href}
              passHref
            >
              {item.text}
            </Link>
          ))}
          <div
            className='block p-2 text-red-600 hover:text-red-500 hover:cursor-pointer'
            onClick={() => {
              signOut()
            }}
          >
            ログアウト
          </div>
          {/* <div
              className='block p-2 hover:text-red-600 text-red-500 hover:cursor-pointer'
              onClick={handleItemClick}
            >
              退会する
            </div> */}
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}
