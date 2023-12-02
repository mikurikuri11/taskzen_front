import { Popover, Transition } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, FC, Fragment, useState } from 'react'
import { useRecoilState } from 'recoil'
import { addCategory } from '../api/addCategory'
import { getCategories } from '../api/getCategories'
import { CategoryList } from '@/features/category/components/CategoryList'
import { CategoryAtom } from '@/recoil/atoms/categoryAtom'

export const CategoryFlyoutMenu: FC = () => {
  const { data: session, status } = useSession()
  const [categories, setCategories] = useRecoilState(CategoryAtom)
  const [inputCategory, setInputCategory] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchCategories = async () => {
    const categories = await getCategories({ id: session?.user?.id ?? '' })
    setCategories(categories);
  }

  const onClickAdd = async () => {
    const category = {
      name: inputCategory
    }
    const newCategory = await addCategory({ category: category, id: session?.user?.id ?? '' });
    setCategories(prevCategories => [...prevCategories, newCategory]);
    setInputCategory("");
  }

  const handleEdit = async () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    setIsEditing(false);
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
        <Popover.Panel className='absolute left-1/2 z-10 mt-5 flex max-h-screen overflow-y-auto -translate-x-1/2 px-4 w-auto'>
          <div className='w-64 shrink rounded-xl bg-slate-300 p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
            <fieldset>
              <legend className="sr-only">Notifications</legend>
              <CategoryList
                categories={categories}
                isEditing={isEditing}
                onEdit={handleEdit}
                onSave={handleSave}
              />
            </fieldset>
            {/* ... (existing code) */}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
