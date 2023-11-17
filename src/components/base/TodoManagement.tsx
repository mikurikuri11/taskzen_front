"use client";

import { useState, FC } from 'react'
import { Sidebar } from '@/components/base/Sidebar'
import { PurpleButton } from '@/components/ui/Button/PurpleButton'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useSetTodosForStatus } from '@/features/todo/hooks/useSetTodosForStatus'
import { useSetTodos } from '@/hooks/useSetTodos'

export const TodoManagement: FC = () => {
  const [open, setOpen] = useState(false)

  const todos = useSetTodos()
  useSetTodosForStatus(todos)

  const openSidebar = () => {
    setOpen(true)
  }

  return (
    <>
      <div className='mx-auto max-w-screen-md flex justify-between my-10'>
        <h1 className='text-white text-2xl font-bold mt-4'>Todo Matrix</h1>
        <PurpleButton onClick={openSidebar}>Open Sidebar</PurpleButton>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-evenly'>
        <div className='text-white'>緊急</div>
        <div className='text-white'>緊急でない</div>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-between'>
        <div className='mx-auto max-w-screen-md flex flex-col justify-evenly my-8'>
          <div className='text-white mx-6' style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          重要
        </div>
        <div className='text-white mx-6' style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          重要でない
        </div>
        </div>
        <TodoMatrix />
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  )
}
