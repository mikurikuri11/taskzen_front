'use client'

import { Dialog, Transition } from '@headlessui/react'

import { useSession } from 'next-auth/react'
import { useEffect, FC, Fragment } from 'react'
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { deleteTodo } from '../api/deleteTodo'
import { editTodo } from '../api/editTodo'
import { Todo } from '../api/types'
import { StyledSubmitButton } from '@/components/ui/Button/StyledSubmitButton'
import { addCategory } from '@/features/category/api/addCategory'
import { deleteCategory } from '@/features/category/api/deleteCategory'
import { getCategories } from '@/features/category/api/getCategories'
import { CategoryFlyoutMenu } from '@/features/category/components/CategoryFlyoutMenu'
import { getTodos } from '@/features/todo/api/getTodos'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'
import { TodoAtom } from '@/recoil/atoms/todoAtom'

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
    reset,
  } = useForm<Todo>()

  const { data: session, status } = useSession()
  const setTodos = useSetRecoilState(TodoAtom)
  const [categories, setCategories] = useRecoilState(CategoryAtom)

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    if (todo?.id) {
      await editTodo({ updatedTodo: data, id: todo?.id })
      const updatedTodos = await getTodos({ id: session?.user?.id ?? '' })
      setTodos(updatedTodos)
      setOpen(false)
      reset()
    }
  }

  const handleDelete = async (id: number) => {
    await deleteTodo({ id })
  }

  const fetchCategories = async () => {
    const categories = await getCategories({ id: session?.user?.id ?? '' })
    setCategories(categories);
  }

  // const onClickAdd = async (data) => {
  //   await addCategory({ category: data, id: session?.user?.id ?? '' });
    // setCategories(categories);
  // }

  const onClickDelete = async(id: number) => {
    await deleteCategory({ id });
    // setCategories(categories);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

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
                      {categories.map((category) => (
                        <span
                          key={category.id}
                          className="ml-1 mt-2 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                        >
                          <span>{category.name}</span>
                          <button
                            onClick={() => category.id && onClickDelete(category.id)}
                            type="button"
                            className="inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                          >
                            <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                              <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                            </svg>
                          </button>
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
                      <div className='col-span-full flex gap-4'>
                        <StyledSubmitButton
                          className='bg-indigo-500 text-lg'
                          onClick={handleSubmit(onSubmit)}
                        >
                          更新
                        </StyledSubmitButton>
                        <StyledSubmitButton
                          className='bg-red-500'
                          onClick={() => todo && handleDelete(todo.id)}
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
