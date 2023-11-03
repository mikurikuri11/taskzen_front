"use client";

import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { FC, Fragment, useState } from 'react'

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateTodoModal: FC<Props> = (props) => {
  const { open, setOpen } = props;
  const { data: session, status } = useSession();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="mt-5 sm:mt-6">
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 mx-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                      タイトル
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="title"
                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                      日付
                    </label>
                    <div className="mt-2">
                      <input
                        id="date"
                        name="date"
                        type="date"
                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="日付"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="area" className="block text-sm font-medium leading-6 text-gray-900">
                      領域
                    </label>
                    <div className="mt-2">
                      <select
                        id="area"
                        name="area"
                        autoComplete="area"
                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>第1領域</option>
                        <option>第2領域</option>
                        <option>第3領域</option>
                        <option>第4領域</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                      詳細
                    </label>
                    <div className="mt-2">
                      <textarea
                        name="details"
                        id="details"
                        autoComplete="details"
                        className="p-3 mb-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        rows={4}
                        placeholder="詳細を入力してください"
                      />
                    </div>
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
