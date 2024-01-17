import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

import { Id, Todo } from '../types'

interface Props {
  todo: Todo
  handleDeleteTodo: (id: Id) => void
}

export const TodoCard = (props: Props) => {
  const { todo, handleDeleteTodo } = props

  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
    setMouseIsOver(false)
  }

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: todo.id,
    data: {
      type: 'Todo',
      todo,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='
        hover:ring-2
        hover:ring-insert
        hover:ring-gray-500
        cursor-grab
        bg-slate-300
        w-full
        h-12
        rounded-md
        p-2
        text-center
        opacity-30
        '
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='flex justify-between hover:ring-2
      hover:ring-insert
      hover:ring-gray-500
      cursor-grab
      bg-slate-300
      w-full
      rounded-md
      p-2
      text-center
    '
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p>{todo.title}</p>
      {mouseIsOver && (
        <button
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
          className='
            stroke-white
            top-1/2
            -translate-y-1/2
            bg-columnBackgroundColor
            mt-3
            ml-auto
            mr-2
            rounded-full
            cursor-pointer
            '
        >
          <FaRegTrashAlt />
        </button>
      )}
    </div>
  )
}
