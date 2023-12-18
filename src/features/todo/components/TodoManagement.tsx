"use client";

import { FC } from 'react'
import { StyledButton } from '@/components/ui-elements/Button/StyledButton'
import { Sidebar } from '@/features/todo/components/Sidebar'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useTodoManagement } from '@/features/todo/hooks/useTodoManagement'

export const TodoManagement: FC = () => {
  const {
    open,
    setOpen,
    todosByOne,
    todosByTwo,
    todosByThree,
    todosByFour,
    openSidebar,
  } = useTodoManagement()

  return (
    <>
      <div className='mx-auto max-w-screen-md flex justify-between my-10'>
        <h1 className='text-white text-2xl font-bold mt-4'>Todo Matrix</h1>
        <StyledButton buttonStyle='bg-indigo-500' onClick={openSidebar}>
          Todoを作成する
        </StyledButton>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-evenly'>
        <div className='text-white'>緊急</div>
        <div className='text-white'>緊急でない</div>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-between'>
        <div className='mx-auto max-w-screen-md flex flex-col justify-evenly my-8'>
          <div
            className='text-white mx-6'
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            重要
          </div>
          <div
            className='text-white mx-6'
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            重要でない
          </div>
        </div>
        <TodoMatrix
          todosByOne={todosByOne}
          todosByTwo={todosByTwo}
          todosByThree={todosByThree}
          todosByFour={todosByFour}
        />
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  )
}