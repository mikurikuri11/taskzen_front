import { FC } from 'react'

import { ButtonProps } from './types'

export const BlueButton: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type='button'
      className='rounded-md bg-cyan-500 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
