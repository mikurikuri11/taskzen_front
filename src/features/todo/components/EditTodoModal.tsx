'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { useEffect, FC, Fragment, useState, use } from 'react'
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { editTodo } from '../api/editTodo'
import { Id, Todo } from '../types'
import { StyledSubmitButton } from '@/components/ui-elements/Button/StyledSubmitButton'
import { deleteCategory } from '@/features/category/api/category/deleteCategory'
import { getTodoCategories } from '@/features/category/api/todoCategory/getTodoCategories'
import { CategoryFlyoutMenu } from '@/features/category/components/CategoryFlyoutMenu'
import { deleteTodo } from '@/features/todo/api/deleteTodo'
import { getIncompleteTodos } from '@/features/todo/api/getIncompleteTodos'
import { getTodos } from '@/features/todo/api/getTodos'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { ModalTodoAtom } from '@/recoil/atoms/modalTodoAtom'
import { TodoAtom } from '@/recoil/atoms/todoAtom'
import { TodoCategoryAtom } from '@/recoil/atoms/todoCategoryAtom'


type Props = {
  todo: Todo | null
  open: boolean
  setOpen: (open: boolean) => void
}

export const EditTodoModal: FC<Props> = (props) => {
  const { todo, open, setOpen } = props

  const defaultValues = {
    title: todo?.title,
    zone: todo?.zone,
    due_date: todo?.due_date,
    description: todo?.description,
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<Todo>({
    mode: 'onChange',
    defaultValues,
  })

  const { data: session, status } = useSession()
  const setTodos = useSetRecoilState(TodoAtom)
  const [todoCategories, setTodoCategories] = useRecoilState(TodoCategoryAtom)
  const [incompletedTodos, setIncompletedTodos] = useRecoilState(IncompletedTodoAtom)

  // useEffect(() => {
  //   const categoryIds = todoCategories
  //     .map((category) => category.id)
  //     .filter((id) => id !== undefined)
  //     .map((id) => id as number)

  //   if (todo) {
  //     const updateTodos = {
  //       ...todo,
  //       category_ids: categoryIds,
  //     }

  //     setModalTodo(updateTodos)
  //   }
  // }, [todo, todoCategories])

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    if (todo?.id) {
      await editTodo({ updatedTodo: data, id: todo?.id })
      const updatedTodos = await getTodos({ id: session?.user?.id ?? '' })
      if (updatedTodos) {
        setTodos(updatedTodos)
      } else {
        setTodos([])
      }
      setOpen(false)
      reset()
    }
  }

  async function handleDeleteTodo(id: Id) {
    if (session?.user?.id) {
      await deleteTodo({ id })
      const updatedTodos = await getIncompleteTodos({ id: session.user.id })
      setIncompletedTodos(updatedTodos)
    }
  }

  // const fetchTodoCategories = async () => {
  //   if (todo) {
  //     const todoCategory = await getTodoCategories({ id: todo.id })
  //     setTodoCategories(todoCategory)
  //   }
  // }

  // useEffect(() => {
  //   fetchTodoCategories()
  // }, [todo])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6'>
                  <div className='mt-5 sm:mt-6'></div>

                  <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 mx-8'>
                    <div className='sm:col-span-6'>
                      <label
                        htmlFor='title'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        タイトル
                      </label>
                      <div className='mt-2'>
                        <input
                          {...register('title', { required: true })}
                          defaultValue={defaultValues?.title}
                          id='title'
                          name='title'
                          type='text'
                          autoComplete='title'
                          className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.title && <span className='text-red-500'>タイトルは必須です</span>}
                      </div>
                    </div>

                    <div className='sm:col-span-6'>
                      <div className='flex '>
                        <label
                          htmlFor='zone'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          カテゴリー
                        </label>
                        <CategoryFlyoutMenu />
                      </div>
                      {todoCategories &&
                        todoCategories.map((category) => (
                          <span
                            key={category.id}
                            className='ml-1 mt-2 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 px-2 text-sm font-medium text-gray-900'
                          >
                            <span>{category.name}</span>
                          </span>
                        ))}
                    </div>

                    <div className='sm:col-span-4'>
                      <label
                        htmlFor='zone'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        領域
                      </label>
                      <div className='mt-2'>
                        <select
                          defaultValue={defaultValues?.zone}
                          {...register('zone', { required: true })}
                          id='zone'
                          name='zone'
                          autoComplete='zone'
                          className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                        >
                          <option value=''>選択してください</option>
                          <option value='1'>第1領域</option>
                          <option value='2'>第2領域</option>
                          <option value='3'>第3領域</option>
                          <option value='4'>第4領域</option>
                        </select>
                        {errors.zone && <span className='text-red-500'>領域は必須です</span>}
                      </div>
                    </div>

                    <div className='sm:col-span-4'>
                      <label
                        htmlFor='due_date'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        日付
                      </label>
                      <div className='mt-2'>
                        <input
                          defaultValue={defaultValues?.due_date}
                          {...register('due_date')}
                          id='due_date'
                          name='due_date'
                          type='date'
                          className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          placeholder='日付'
                        />
                      </div>
                    </div>

                    <div className='col-span-full'>
                      <label
                        htmlFor='description'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        詳細
                      </label>
                      <div className='mt-2'>
                        <textarea
                          defaultValue={defaultValues?.description}
                          {...register('description')}
                          name='description'
                          id='description'
                          autoComplete='description'
                          className='p-3 mb-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          rows={4}
                          placeholder='詳細を入力してください'
                        />
                      </div>
                      <div className='col-span-full flex gap-4'>
                        <StyledSubmitButton
                          className='bg-indigo-500 text-lg'
                          disabled={!isDirty || !isValid}
                          onClick={handleSubmit(onSubmit)}
                        >
                          更新
                        </StyledSubmitButton>
                        <StyledSubmitButton
                          className='bg-red-500'
                          onClick={() => todo && handleDeleteTodo(todo.id)}
                        >
                          削除
                        </StyledSubmitButton>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  )
}
