'use client'

import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

import { FC } from 'react'
import { useRecoilState } from 'recoil'

import { Todo } from '@/features/todo/api/types/index'

import { useSelectTodo } from '@/features/todo/hooks/useSelectTodo'
import { showTodoModalAtom } from '@/recoil/atoms/showTodoModalAtom'

interface TodoListProps {
  todos: Todo[]
}

const actions = [
  {
    title: '第1の領域',
    // href: '#',
    // icon: ClockIcon,
    // iconForeground: 'text-teal-700',
    // iconBackground: 'bg-teal-50',
  },
  {
    title: '第2の領域',
    // href: '#',
    // icon: CheckBadgeIcon,
    // iconForeground: 'text-purple-700',
    // iconBackground: 'bg-purple-50',
  },
  {
    title: '第3の領域',
    // href: '#',
    // icon: UsersIcon,
    // iconForeground: 'text-sky-700',
    // iconBackground: 'bg-sky-50',
  },
  {
    title: '第4の領域',
    // href: '#',
    // icon: BanknotesIcon,
    // iconForeground: 'text-yellow-700',
    // iconBackground: 'bg-yellow-50',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const TodoMatrix: FC<TodoListProps> = (props) => {
  const { selectedTodo, onSelectTodo } = useSelectTodo()
  const { todos } = props;


  return (
    <div className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {/* {actions.map((action, actionIdx) => ( */}
        <div
          // key={action.title}
          className={classNames(
            // actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            // actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            // actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            // actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72'
          )}
        >
          <div>
            <span
              // className={classNames(
              //   action.iconBackground,
              //   action.iconForeground,
              //   'inline-flex rounded-lg p-3 ring-4 ring-white'
              // )}
            >
              {/* <action.icon className="h-6 w-6" aria-hidden="true" /> */}
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              第1の領域
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              走る
              素早く動く
            </p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            {/* <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg> */}
          </span>
        </div>
        <div
          // key={action.title}
          className={classNames(
            // actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            // actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            // actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            // actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72'
          )}
        >
          <div>
            <span
              // className={classNames(
              //   action.iconBackground,
              //   action.iconForeground,
              //   'inline-flex rounded-lg p-3 ring-4 ring-white'
              // )}
            >
              {/* <action.icon className="h-6 w-6" aria-hidden="true" /> */}
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              第2の領域
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              走る
              素早く動く
            </p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            {/* <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg> */}
          </span>
        </div>
        <div
          // key={action.title}
          className={classNames(
            // actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            // actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            // actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            // actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72'
          )}
        >
          <div>
            <span
              // className={classNames(
              //   action.iconBackground,
              //   action.iconForeground,
              //   'inline-flex rounded-lg p-3 ring-4 ring-white'
              // )}
            >
              {/* <action.icon className="h-6 w-6" aria-hidden="true" /> */}
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              第3の領域
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              走る
              素早く動く
            </p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            {/* <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg> */}
          </span>
        </div>
        <div
          // key={action.title}
          className={classNames(
            // actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            // actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            // actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            // actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72'
          )}
        >
          <div>
            <span
              // className={classNames(
              //   action.iconBackground,
              //   action.iconForeground,
              //   'inline-flex rounded-lg p-3 ring-4 ring-white'
              // )}
            >
              {/* <action.icon className="h-6 w-6" aria-hidden="true" /> */}
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />
              第4の領域
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              走る
              素早く動く
            </p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            {/* <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg> */}
          </span>
        </div>
      {/* ))} */}
    </div>
  )
}
