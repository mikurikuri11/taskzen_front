import React, { FC } from 'react'
import { ButtonProps } from './types'

interface StyledSubmitButtonProps extends ButtonProps {
  className: string
}

export const StyledSubmitButton: FC<StyledSubmitButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      type='submit'
      className={`rounded-md ${className} px-4 py-3 text font-semibold rounded-md text-white hover:${className.replace(
        /bg-.+$/,
        'bg-opacity-80',
      )}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
