'use client'

import { CiEdit } from 'react-icons/ci'
import { MdSaveAlt, MdDeleteOutline } from 'react-icons/md'
import { Category } from '../api/types'
import { useCategoryCard } from '@/features/category/hooks/useCategoryCard'

interface CategoryCardProps {
  category: Category
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  console.log('render CategoryCard' + category.name)
  const {
    editedName,
    setEditedName,
    isEditing,
    handleEdit,
    handleSave,
    handleDelete,
    checked,
    setCheckedCategory,
  } = useCategoryCard(category)

  return (
    <div key={category.id} className='relative flex items-start'>
      <div className='flex h-6 items-center'>
        <input
          id='offers'
          aria-describedby='offers-description'
          name='offers'
          type='checkbox'
          className='h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
          onChange={setCheckedCategory}
          checked={checked}
        />
      </div>
      <div className='ml-3 text-sm leading-6'>
        {isEditing ? (
          <input
            type='text'
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className='px-1 rounded border-gray-400 border mr-1'
          />
        ) : (
          <label htmlFor='offers' className='font-medium text-gray-900'>
            {category.name}
          </label>
        )}{' '}
      </div>
      <div className='flex-grow' />
      <div className='text-xl cursor-pointer'>
        {isEditing ? (
          <MdSaveAlt onClick={handleSave} />
        ) : (
          <div className='flex gap-1'>
            <CiEdit onClick={handleEdit} />
            <MdDeleteOutline onClick={() => category && category.id && handleDelete()} />
          </div>
        )}
      </div>
    </div>
  )
}
