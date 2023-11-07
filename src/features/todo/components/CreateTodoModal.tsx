'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'

import { FC, Fragment, useState } from 'react'
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { addTodo } from '../api/addTodo'
import { Todo } from '../api/types'
import { PurpleCreateButton } from '@/components/ui/Button/PurpleCreateButton'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CreateTodoModal: FC<Props> = (props) => {
  const { open, setOpen } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Todo>()

  const { data: session, status } = useSession()

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    console.log("before if")
    console.log("session" + session?.user.id)
    if (session?.user?.id) {
      console.log("after if")
      addTodo({ todo: data, id: session.user.id })
      // window.location.reload()
    }
  }

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
                          id='title'
                          name='title'
                          type='text'
                          autoComplete='title'
                          className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                        {errors.title && <span className='text-red-500'>タイトルは必須です</span>}
                      </div>
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
                          {...register('description')}
                          name='description'
                          id='description'
                          autoComplete='description'
                          className='p-3 mb-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          rows={4}
                          placeholder='詳細を入力してください'
                        />
                      </div>
                      <PurpleCreateButton onClick={() => setOpen(false)}>作成</PurpleCreateButton>
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
