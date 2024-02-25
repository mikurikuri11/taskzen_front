'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { addCategory } from '../../api/category/addCategory'
import { Category } from '../../types'
import { StyledSubmitButton } from '@/components/ui-elements/Button/StyledSubmitButton'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CreateCategoryModal = (props: Props) => {
  const { open, setOpen } = props
  const { data: session, status } = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Category>()

  const onSubmit: SubmitHandler<Category> = async (data) => {
    if (session?.user?.id) {
      try {
        await addCategory({ category: data, id: session.user.id })
        setOpen(false)
        router.refresh()
        reset({ name: '' })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
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
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 mx-8'>
                  <div className='sm:col-span-6'>
                    <label
                      htmlFor='title'
                      className='block text-xl font-medium leading-6 text-gray-900 mb-5'
                    >
                      タイトル
                    </label>
                    <div className='mt-2'>
                      <input
                        {...register('name', { required: true })}
                        id='name'
                        name='name'
                        type='text'
                        autoComplete='name'
                        className='p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                      {errors.name && <span className='text-red-500'>タイトルは必須です</span>}
                    </div>
                    <StyledSubmitButton
                      className='bg-indigo-500 text-lg mt-5'
                      onClick={handleSubmit(onSubmit)}
                    >
                      作成
                    </StyledSubmitButton>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
