'use client'

import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDisclosure } from '@mantine/hooks'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import { BiLogIn } from 'react-icons/bi'

import { FlyoutMenu } from '../ui-elements/Modal/FlyoutMenu'
import { LoginModal } from '../ui-elements/Modal/LoginModal'

const navigation = [
  { name: 'ドキュメント', href: '/tutorial' },
  { name: 'Todos', href: '/todos' },
  { name: 'レポート', href: '/report' },
]

export const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <header className='bg-gray-800 shadow-2xl'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between' aria-label='Global'>
          <div className='flex items-center gap-x-12 mt-2 mr-7'>
            <Link href='/' className='-m-1.5 p-1.5 mt-3 mr-4'>
              <span className='sr-only'>Your Company</span>
              <Image src='/taskzen-logo.png' alt='' width={50} height={70} />
            </Link>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-sm font-semibold leading-6 text-white hover:text-gray-400 no-underline'
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            {status !== 'authenticated' ? (
              <div
                className='text-sm font-semibold leading-6 text-white cursor-pointer flex items-center'
                onClick={open}
              >
                ログイン <BiLogIn className='ml-2' />
              </div>
            ) : (
              <FlyoutMenu />
            )}
          </div>
        </nav>

        {/* モバイル用メニュー */}
        <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className='fixed inset-0 z-10' />
          <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
            <div className='flex items-center justify-between'>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-400'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/25'>
                <div className='space-y-2 py-6'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800 no-underline'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className='py-6'>
                  <div
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800'
                    onClick={open}
                  >
                    Log in
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <LoginModal opened={opened} close={close} />
    </>
  )
}
