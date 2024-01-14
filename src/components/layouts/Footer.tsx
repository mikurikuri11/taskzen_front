import Link from 'next/link'
import { FC } from 'react'

const navigation = {
  main: [
    { name: 'プライバシーポリシー', href: '/privacy-policy' },
    { name: '利用規約', href: '/terms' },
  ],
}

export const Footer: FC = () => {
  return (
    <footer className='bg-gray-800'>
      <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            &copy; 2020 Your Company, Inc. All rights reserved.
          </span>
        </div>
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          {navigation.main.map((item) => (
            <li key={item.name} className='inline-block mr-4'>
              <Link
                href={item.href}
                className='text-sm leading-6 text-gray-400 hover:text-gray-500'
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
