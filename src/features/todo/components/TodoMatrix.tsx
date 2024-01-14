'use client'

import { memo } from 'react'
import { Todo } from '../types'

import useDragAndDrop from '@/features/todo/hooks/useDragAndDrop'

type Props = {
  todosByOne: Todo[]
  todosByTwo: Todo[]
  todosByThree: Todo[]
  todosByFour: Todo[]
}

export const TodoMatrix = memo((props: Props) => {
  const { todosByOne, todosByTwo, todosByThree, todosByFour } = props

  const todosNameByOne = todosByOne.map((todo) => todo.title)
  const todosNameByTwo = todosByTwo.map((todo) => todo.title)
  const todosNameByThree = todosByThree.map((todo) => todo.title)
  const todosNameByFour = todosByFour.map((todo) => todo.title)

  const initialItems = {
    第1の領域: todosNameByOne,
    第2の領域: todosNameByTwo,
    第3の領域: todosNameByThree,
    第4の領域: todosNameByFour,
  }

  // console.log(initialItems);

  const { items, activeId, sensors, handleDragStart, handleDragOver, handleDragEnd } =
    // TODO: Todoの型のまま、itemsを渡した方がいいかも
    useDragAndDrop(initialItems)

  return (
    <div className='mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0'>
      <div className='overflow-y-auto overflow-x-hidden group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72'>
        <div className='mt-1'>
          <h3 className='text-base font-semibold leading-6 text-gray-900'>
            <span className='absolute inset-0' aria-hidden='true' />
            第1の領域
          </h3>
          <ul className='mt-2'>
            {todosByOne.map((todo) => (
              <li key={todo.id}>
                <span>{todo.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <span
          className='pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400'
          aria-hidden='true'
        ></span>
      </div>
      <div className='border-l group relative bg-yellow-100 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72'>
        <div className='mt-1'>
          <h3 className='text-base font-semibold leading-6 text-gray-900'>
            <span className='absolute inset-0' aria-hidden='true' />
            第2の領域
          </h3>
          <ul className='mt-2'>
            {todosByTwo.map((todo) => (
              <li key={todo.id}>
                <span>{todo.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <span
          className='pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400'
          aria-hidden='true'
        ></span>
      </div>
      <div className='group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72'>
        <div className='mt-1'>
          <h3 className='text-base font-semibold leading-6 text-gray-900'>
            <span className='absolute inset-0' aria-hidden='true' />
            第3の領域
          </h3>
          <ul className='mt-2'>
            {todosByThree.map((todo) => (
              <li key={todo.id}>
                <span>{todo.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <span
          className='pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400'
          aria-hidden='true'
        ></span>
      </div>
      <div className='border-l group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72'>
        <div className='mt-1'>
          <h3 className='text-base font-semibold leading-6 text-gray-900'>
            <span className='absolute inset-0' aria-hidden='true' />
            第4の領域
          </h3>
          <ul className='mt-2'>
            {todosByFour.map((todo) => (
              <li key={todo.id}>
                <span>{todo.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <span
          className='pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400'
          aria-hidden='true'
        ></span>
      </div>
    </div>
  )
})

TodoMatrix.displayName = 'TodoMatrix'
