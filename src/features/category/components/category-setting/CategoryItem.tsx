import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import { Category, Id } from '@/types'

interface Props {
  category: Category
  onDelete: () => void
  handleUpdate: (id: Id, name: string) => void
}

export const CategoryItem = (props: Props) => {
  const { category, onDelete, handleUpdate } = props
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const handleMouseEnter = () => {
    setMouseIsOver(true)
  }

  const handleMouseLeave = () => {
    setMouseIsOver(false)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
    setMouseIsOver(false)
  }

  if (editMode) {
    return (
      <div
        className='
        p-2
        text-left
      '
      >
        <textarea
          className='
            resize-none
            border-none
            bg-transparent
            text-white
            bg-gray-700
            outline
            ring-0
            border-transparent
            rounded-md
            px-2
            mb-0
            w-full
          '
          defaultValue={category.name}
          autoFocus
          placeholder='Edit category'
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              toggleEditMode()
            }
          }}
          onChange={(e) => handleUpdate(category.id!, e.target.value)}
        ></textarea>
      </div>
    )
  }

  return (
    <div className='flex'>
      <h2 className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0'>
        {category.name}
      </h2>
      <div className='mt-5 text-2xl ml-auto flex gap-4'>
        <CiEdit
          className='cursor-pointer hover:text-blue-400'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleEditMode}
        />
        <MdDeleteOutline className='cursor-pointer hover:text-red-400' onClick={onDelete} />
      </div>
    </div>
  )
}
