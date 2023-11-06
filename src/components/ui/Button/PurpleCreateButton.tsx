import { FC } from 'react'
import { ButtonProps } from './types'

export const PurpleCreateButton: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type='submit'
      className="'rounded-md bg-indigo-500 px-4 py-3 text-sm font-semibold rounded-md text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
