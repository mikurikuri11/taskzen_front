import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Category, Todo } from '@/types'

interface CategoryCardProps {
  todo: Todo | null | undefined
  category: Category
  setSelectedCategories: Dispatch<SetStateAction<Category[] | null>>
}

export const CategoryCard = (props: CategoryCardProps) => {
  const { todo, category, setSelectedCategories } = props
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!todo || !category) return
    if (!todo || !todo.categories || todo.categories.length === 0) {
      setChecked(false)
      return
    }

    const isCategoryIncluded = todo.categories.some((cat) => cat.id === category.id)
    setChecked(isCategoryIncluded)
  }, [todo, category, setChecked])

  const handleCheckboxChange = () => {
    setChecked(!checked)
    if (checked) {
      setSelectedCategories((prevCategories) => {
        if (!prevCategories) return null
        return prevCategories.filter((cat) => cat.id !== category.id)
      })
    } else {
      setSelectedCategories((prevCategories) => {
        if (!prevCategories) return [category]
        return [...prevCategories, category]
      })
    }
  }

  return (
    <div key={category.id} className='relative flex items-start gap-2'>
      <p>{category.name}</p>
      <div className='flex h-6 items-center'>
        <input
          id={category.id?.toString()}
          aria-describedby='offers-description'
          name={category.id?.toString()}
          type='checkbox'
          className='h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
          onChange={handleCheckboxChange}
          checked={checked}
        />
      </div>
      <div className='ml-3 text-sm leading-6'></div>
      <div className='flex-grow' />
      <div className='text-xl cursor-pointer'></div>
    </div>
  )
}
