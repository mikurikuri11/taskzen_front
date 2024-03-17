'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { Tooltip, Stack, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import {
  IconHome2,
  IconLogout,
  IconCheck,
  IconCategory2,
  IconChartLine,
  IconInfoSquareRounded,
  IconBrandCtemplar,
  IconLogin,
  IconFiles,
} from '@tabler/icons-react'

import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { FlyoutMenu } from '../ui-elements/Modal/FlyoutMenu'
import { LoginModal } from '../ui-elements/Modal/LoginModal'

const openModal = () =>
  modals.openConfirmModal({
    title: 'ログアウトしてもよろしいですか？',
    labels: { confirm: 'OK', cancel: 'キャンセル' },
    confirmProps: { color: 'red' },
    onCancel: () => console.log('キャンセル'),
    onConfirm: () => signOut(),
  })

interface NavbarLinkProps {
  icon: typeof IconHome2
  label: string
  active?: boolean
  onClick?(): void
  href?: string
}

function NavbarLink({ icon: Icon, label, active, onClick, href }: NavbarLinkProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <Tooltip label={label} position='right' transitionProps={{ duration: 0 }}>
      <Link onClick={handleClick} href={href ? href : '#'} data-active={active || undefined}>
        <Icon
          style={{ width: rem(28), height: rem(28) }}
          stroke={1.5}
          className='text-white mr-8'
        />
      </Link>
    </Tooltip>
  )
}

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [active, setActive] = useState(2)
  const { data: session } = useSession()
  const [opened, { open, close }] = useDisclosure(false)

  const menuItems = session
    ? [
        { icon: IconHome2, label: 'ホーム', href: '/' },
        { icon: IconFiles, label: 'チュートリアル', href: '/tutorial' },
        { icon: IconCheck, label: 'Todos', href: '/todos' },
        { icon: IconCategory2, label: 'カテゴリー', href: '/category-setting' },
        { icon: IconChartLine, label: 'レポート', href: '/report' },
        // { icon: IconCalendarStats, label: 'カレンダー', href: '/calender' },
        { icon: IconInfoSquareRounded, label: '利用規約', href: '/terms' },
        { icon: IconBrandCtemplar, label: 'プライバシーポリシー', href: '/privacy-policy' },
        // { icon: IconSettings, label: 'Settings' },
      ]
    : [
        { icon: IconHome2, label: 'ホーム', href: '/' },
        { icon: IconFiles, label: 'チュートリアル', href: '/tutorial' },
        { icon: IconInfoSquareRounded, label: '利用規約', href: '/terms' },
        { icon: IconBrandCtemplar, label: 'プライバシーポリシー', href: '/privacy-policy' },
      ]

  const links = menuItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ))

  return (
    <>
      <div>
        {/* モバイル用 */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as='div' className='relative z-50 lg:hidden' onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-900/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-2 ring-1 ring-white/10'>
                    <div className='flex h-16 shrink-0 items-center'>
                      <Image
                        src='/taskzen-logo.png'
                        alt=''
                        width={50}
                        height={70}
                        className='mt-4 mr-4'
                      />
                    </div>
                    <nav className='flex flex-1 flex-col gap-8'>
                      <ul role='list' className='-mx-2 flex-1 space-y-1'>
                        {menuItems.map((item) => (
                          <li key={item.label}>
                            <p className='text-white flex gap-2 no-underline'>
                              <item.icon className='h-6 w-6 shrink-0' aria-hidden='true' />
                              {item.label}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        Ï {/* デスクトップ用 */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:bg-gray-800 lg:pb-4'>
          <div className='flex h-16 shrink-0 items-center justify-center mt-8'>
            <Image src='/taskzen-logo.png' alt='' width={50} height={70} />
          </div>

          <nav className='mt-8'>
            <ul role='list' className='flex flex-col items-center space-y-10 mr-2'>
              {links}
            </ul>
          </nav>

          <Stack className='ml-7 mt-20 mb-auto'>
            {session ? (
              <NavbarLink icon={IconLogout} label='ログアウト' onClick={openModal} />
            ) : (
              <NavbarLink icon={IconLogin} label='ログイン' onClick={open} />
            )}
          </Stack>
        </div>
        {/* モバイル用 */}
        <div className='sticky top-0 z-40 flex items-center gap-x-6 bg-gray-800 px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
          <button
            type='button'
            className='-m-2.5 p-2.5 text-gray-400 lg:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
          <div className='flex-1 text-sm font-semibold leading-6 text-white'>Dashboard</div>
          <FlyoutMenu />
        </div>
      </div>
      <LoginModal opened={opened} close={close} />
    </>
  )
}
