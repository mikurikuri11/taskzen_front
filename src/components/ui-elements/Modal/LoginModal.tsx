'use client'

import { Modal } from '@mantine/core'
import Link from 'next/link'
import { GoogleLoginButton } from '../Button/GoogleLoginButton'

interface LoginModalProps {
  opened: boolean
  close: () => void
}

export const LoginModal = (props: LoginModalProps) => {
  const { opened, close } = props
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <div className='mt-3 sm:mt-4'>
          <GoogleLoginButton />
        </div>
        <div>
          <div className='mt-3 text-center sm:mt-5'>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                <Link href='/terms' className='text-indigo-600 hover:text-indigo-500 no-underline'>
                  利用規約
                </Link>
                、
                <Link
                  href='/privacy-policy'
                  className='text-indigo-600 hover:text-indigo-500 no-underline'
                >
                  プライバシーポリシー
                </Link>
                に同意した上でログインしてください。
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
