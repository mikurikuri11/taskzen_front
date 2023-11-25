"use client";

import { useState, useEffect, FC } from 'react'
import { useRecoilState } from 'recoil'
import { Sidebar } from '@/components/base/Sidebar'
import { PurpleButton } from '@/components/ui/Button/PurpleButton'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useSetTodosForStatus } from '@/features/todo/hooks/useSetTodosForStatus'
import { useSetTodos } from '@/hooks/useSetTodos'
import { incompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'

export const TodoManagement: FC = () => {
  const [open, setOpen] = useState(false)

  const todos = useSetTodos()
  useSetTodosForStatus(todos)

  const [incompletedTodos, setIncompletedTodos] = useRecoilState(incompletedTodoAtom)

  const filterTodosByZone = (zone: number) => incompletedTodos.filter((todo) => todo.zone === zone);

  const [todosByOne, setTodosByOne] = useState(filterTodosByZone(1));
  const [todosByTwo, setTodosByTwo] = useState(filterTodosByZone(2));
  const [todosByThree, setTodosByThree] = useState(filterTodosByZone(3));
  const [todosByFour, setTodosByFour] = useState(filterTodosByZone(4));

  useEffect(() => {
    setTodosByOne(filterTodosByZone(1));
    setTodosByTwo(filterTodosByZone(2));
    setTodosByThree(filterTodosByZone(3));
    setTodosByFour(filterTodosByZone(4));
  }, [incompletedTodos]);

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
        <TodoMatrix todosByOne={todosByOne} todosByTwo={todosByTwo} todosByThree={todosByThree} todosByFour={todosByFour} />
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  )
}
