'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useSetRecoilState } from 'recoil'
import { StyledButton } from '../../../components/ui-elements/Button/StyledButton'
import { TodoList } from '@/features/todo/components/TodoList'
import { showCreateTodoModalAtom } from '@/recoil/atoms/showCreateTodoModalAtom'

type SidebarProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const Sidebar = (props: SidebarProps) => {
  const setShowCreateTodoModal = useSetRecoilState(showCreateTodoModalAtom)
  const { open, setOpen } = props

  const openModal = () => {
    setShowCreateTodoModal(true)
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <div className='fixed inset-0' />

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                    <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                      <div className='p-6'>
                        <div className='flex items-start justify-between'>
                          <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
                            Todo List
                          </Dialog.Title>
                          <div className='ml-3 flex h-7 items-center'>
                            <StyledButton buttonStyle='bg-indigo-500 text-sm' onClick={openModal}>
                              Add Todo
                            </StyledButton>
                          </div>
                        </div>
                      </div>
                      <div className='border-b border-gray-200'>
                        <div className='px-6'>
                          <nav className='-mb-px flex space-x-6'></nav>
                        </div>
                      </div>
                      <TodoList />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
