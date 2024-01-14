'use client'

import { memo } from 'react'
import { Todo } from '../types'

type Props = {
  todos: Todo[]
}

export const TodoMatrix = memo((props: Props) => {
  const { todos } = props

  return (
    <div className='mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0'>
      <div className='overflow-y-auto overflow-x-hidden group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72'>
        <div className='mt-1'>
          <h3 className='text-base font-semibold leading-6 text-gray-900'>
            <span className='absolute inset-0' aria-hidden='true' />
            第1の領域
          </h3>
          <ul className='mt-2 list-none'>
            {todos
              .filter((todo) => todo.zone === 1)
              .map((todo) => (
                <li key={todo.id}>
                  {todo.title}
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
          <ul className='mt-2 list-none'>
            {todos
              .filter((todo) => todo.zone === 2)
              .map((todo) => (
                <li key={todo.id}>
                  {todo.title}
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
          <ul className='mt-2 list-none'>
            {todos
              .filter((todo) => todo.zone === 3)
              .map((todo) => (
                <li key={todo.id}>
                  {todo.title}
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
          <ul className='mt-2 list-none'>
            {todos
              .filter((todo) => todo.zone === 4)
              .map((todo) => (
                <li key={todo.id}>
                  {todo.title}
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
