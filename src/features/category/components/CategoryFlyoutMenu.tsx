import { Popover, Transition } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, FC, Fragment } from 'react'
import { useRecoilState } from 'recoil'
import { getCategories } from '../api/getCategories'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'

export const CategoryFlyoutMenu: FC = () => {
  const { data: session, status } = useSession()
  const [categories, setCategories] = useRecoilState(CategoryAtom)

  const fetchCategories = async () => {
    const categories = await getCategories({ id: session?.user?.id ?? '' })
    setCategories(categories);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Popover className='relative'>
      <Popover.Button className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus: outline-none cursor-pointer'>
        <button
          type="button"
          className="ml-2 rounded-full bg-gray-600 p-1 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-3 w-4" aria-hidden="true" />
        </button>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4'>
          <div className='w-60 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
            <fieldset>
              <legend className="sr-only">Notifications</legend>
              <div className="space-y-5">
                {categories.length === 0 && (
                    <div>
                      カテゴリーがありません
                    </div>
                    )}
                {categories.map((category) => (
                  <div key={category.id} className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        aria-describedby="offers-description"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        {category.name}
                      </label>{' '}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
