import React, { FC } from 'react';
import { ButtonProps } from './types';

interface StyledSubmitButtonProps extends ButtonProps {
  className: string;
}

export const StyledSubmitButton: FC<StyledSubmitButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      type='submit'
      className={`rounded-md ${className} px-4 py-3 text font-semibold rounded-md text-white shadow-sm hover:${className.replace(
        /bg-.+$/,
        'bg-opacity-80'
      )} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
