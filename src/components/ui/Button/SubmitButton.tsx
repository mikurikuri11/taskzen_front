import { FC } from 'react'

import { ButtonProps } from './types'

export const SubmitButton: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type='submit'
      className='rounded-md bg-indigo-500 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </button>
  )
}
