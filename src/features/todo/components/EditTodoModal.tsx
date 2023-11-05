// 'use client'

// import { Dialog, Transition } from '@headlessui/react'
// import { useSession } from 'next-auth/react'

// import { FC, Fragment, useState } from 'react'
// import { Todo } from '../api/types'

// type Props = {
//   todo: Todo | null
//   open: boolean
//   setOpen: (open: boolean) => void
// }

// export const EditTodoModal: FC<Props> = (props) => {
//   const { todo, open, setOpen } = props
//   const { data: session, status } = useSession()

//   console.log('due_date', todo?.due_date)
//   console.log('Todo', todo)

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog as='div' className='relative z-10' onClose={setOpen}>
//         <Transition.Child
//           as={Fragment}
//           enter='ease-out duration-300'
//           enterFrom='opacity-0'
//           enterTo='opacity-100'
//           leave='ease-in duration-200'
//           leaveFrom='opacity-100'
//           leaveTo='opacity-0'
//         >
//           <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
//         </Transition.Child>

//         <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
//           <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
//             <Transition.Child
//               as={Fragment}
//               enter='ease-out duration-300'
//               enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
//               enterTo='opacity-100 translate-y-0 sm:scale-100'
//               leave='ease-in duration-200'
//               leaveFrom='opacity-100 translate-y-0 sm:scale-100'
//               leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
//             >
//               <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6'>
//                 <div className='mt-5 sm:mt-6'></div>

//                 <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 mx-8'>
//                   <div className='sm:col-span-6'>
//                     <label
//                       htmlFor='title'
//                       className='block text-sm font-medium leading-6 text-gray-900'
//                     >
//                       タイトル
//                     </label>
//                     <div className='mt-2'>
//                       <input
//                         defaultValue={todo?.title}
//                         id='title'
//                         name='title'
//                         type='text'
//                         autoComplete='title'
//                         className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
//                       />
//                     </div>
//                   </div>

//                   <div className='sm:col-span-4'>
//                     <label
//                       htmlFor='area'
//                       className='block text-sm font-medium leading-6 text-gray-900'
//                     >
//                       完了済み
//                     </label>
//                     <input
//                       defaultChecked={todo?.completed}
//                       type='checkbox'
//                       id='area'
//                       name='area'
//                       autoComplete='area'
//                       className='mt-2 h-5 w-5 rounded border-0 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900'
//                     />
//                   </div>

//                   <div className='sm:col-span-4'>
//                     <label
//                       htmlFor='area'
//                       className='block text-sm font-medium leading-6 text-gray-900'
//                     >
//                       領域
//                     </label>
//                     <div className='mt-2'>
//                       <select
//                         defaultValue={todo?.zone}
//                         id='area'
//                         name='area'
//                         autoComplete='area'
//                         className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
//                       >
//                         <option value='1'>第1領域</option>
//                         <option value='2'>第2領域</option>
//                         <option value='3'>第3領域</option>
//                         <option value='4'>第4領域</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className='sm:col-span-4'>
//                     <label
//                       htmlFor='date'
//                       className='block text-sm font-medium leading-6 text-gray-900'
//                     >
//                       日付
//                     </label>
//                     <div className='mt-2'>
//                       <input
//                         defaultValue={todo?.due_date}
//                         id='date'
//                         name='date'
//                         type='date'
//                         className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
//                         placeholder='日付'
//                       />
//                     </div>
//                   </div>

//                   <div className='col-span-full'>
//                     <label
//                       htmlFor='details'
//                       className='block text-sm font-medium leading-6 text-gray-900'
//                     >
//                       詳細
//                     </label>
//                     <div className='mt-2'>
//                       <textarea
//                         defaultValue={todo?.description}
//                         name='details'
//                         id='details'
//                         autoComplete='details'
//                         className='p-3 mb-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
//                         rows={4}
//                         placeholder='詳細を入力してください'
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   )
// }

'use client'

import { Dialog, Transition } from '@headlessui/react'

import { FC, Fragment, useState } from 'react'
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { editTodo } from '../api/editTodo'
import { Todo } from '../api/types'
import { PurpleCreateButton } from '@/components/ui/Button/CreatePurpleButton'

type Props = {
  todo: Todo | null
  open: boolean
  setOpen: (open: boolean) => void
}

export const EditTodoModal: FC<Props> = (props) => {
  const { todo, open, setOpen } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Todo>()

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    console.log('data', data)
    await editTodo({ updatedTodo: data, id: todo?.id });
      window.location.reload()
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
                          defaultValue={todo?.title}
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
                          defaultValue={todo?.zone}
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
                          defaultValue={todo?.due_date}
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
                          defaultValue={todo?.description}
                          {...register('description')}
                          name='description'
                          id='description'
                          autoComplete='description'
                          className='p-3 mb-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          rows={4}
                          placeholder='詳細を入力してください'
                        />
                      </div>
                      <PurpleCreateButton onClick={() => setOpen(false)}>編集</PurpleCreateButton>
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
