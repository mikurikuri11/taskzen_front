'use client'

import { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdSaveAlt, MdDeleteOutline } from 'react-icons/md'
import { Category } from '../types'
import { useCategoryCard } from '@/features/category/hooks/useCategoryCard'

interface CategoryCardProps {
  category: Category
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // const {
  //   editedName,
  //   setEditedName,
  //   isEditing,
  //   handleEdit,
  //   handleSave,
  //   handleDelete,
  //   checked,
  //   setCheckedCategory,
  // } = useCategoryCard(category)

  const [checked, setChecked] = useState(false)

  // TODO: カテゴリーのチェックロジックを実装する
  const setCheckedCategory = () => {
    setChecked(!checked)
    const newCategoryId = category.id as number

    if (checked) {
      // const filteredTodoCategory = todoCategory.filter((todoCat) => todoCat.id !== newCategoryId)
      // setTodoCategory(filteredTodoCategory)
      // updateTodoCategoryRemove(newCategoryId)
    } else {
      // setTodoCategory([...todoCategory, category])
      // updateTodoCategory(newCategoryId)
    }
  }

  return (
    <div key={category.id} className='relative flex items-start gap-2'>
      <p>{category.name}</p>
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
        {/* {isEditing ? (
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
        )}{' '} */}
      </div>
      <div className='flex-grow' />
      <div className='text-xl cursor-pointer'>
        {/* {isEditing ? (
          <MdSaveAlt onClick={handleSave} />
        ) : (
          <div className='flex gap-1'>
            <CiEdit onClick={handleEdit} />
            <MdDeleteOutline onClick={() => category && category.id && handleDelete()} />
          </div>
        )} */}
      </div>
    </div>
  )
}
