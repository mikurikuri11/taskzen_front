import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa'

import { Id, Todo } from '@/types'

interface Props {
  todo: Todo
  openEditModal: (id: Id) => void
}

export const TodoCard = (props: Props) => {
  const { todo, openEditModal } = props

  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // const toggleEditMode = () => {
  //   setEditMode(!editMode)
  //   setMouseIsOver(false)
  // }

  // const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
  //   id: todo.id,
  //   data: {
  //     type: 'Todo',
  //     todo,
  //   },
  // })

  // const style = {
  //   transition,
  //   transform: CSS.Transform.toString(transform),
  // }

  // if (isDragging) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       className='
  //       hover:ring-2
  //       hover:ring-insert
  //       hover:ring-gray-500
  //       cursor-grab
  //       bg-slate-300
  //       w-full
  //       h-12
  //       rounded-md
  //       p-2
  //       text-center
  //       opacity-30
  //       '
  //     ></div>
  //   )
  // }

  return (
    <div
      // ref={setNodeRef}
      // style={style}
      // {...attributes}
      // {...listeners}
      className='
      flex
      justify-between
      cursor-grab
      bg-slate-300
      w-full
      rounded-md
      px-2
      text-center
    '
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p>{todo.title}</p>
      <p>
        {mouseIsOver && (
          <FaEdit onClick={() => openEditModal(todo.id)} className='cursor-pointer mr-1' />
        )}
      </p>
    </div>
  )
}
