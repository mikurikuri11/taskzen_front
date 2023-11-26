import React, { FC } from 'react';
import { ButtonProps } from './types';

interface StyledButtonProps extends ButtonProps {
  buttonStyle: string; // ボタンのスタイルを指定するクラス名
}

export const StyledButton: FC<StyledButtonProps> = ({ children, onClick, buttonStyle }) => {
  return (
    <button
      type='button'
      className={`rounded-md ${buttonStyle} px-4 py-3 text-lg font-semibold text-white shadow-sm hover:${buttonStyle.replace(
        '500',
        '400'
      )} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${buttonStyle.includes('indigo') ? 'indigo' : 'cyan'}-500`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
