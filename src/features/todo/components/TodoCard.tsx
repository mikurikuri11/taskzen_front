import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Todo } from '../types'

interface Props {
  todo: Todo
}

export const TodoCard = (props: Props) => {
  const { todo } = props

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
        opacity-50
        '
      >
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='text-wrap'
      >
      <div
        className='
        hover:ring-2
        hover:ring-insert
        hover:ring-gray-500
        cursor-grab
        bg-slate-300
        w-full
        rounded-md
        p-2
        text-center
        '
      >
        {todo.title}
      </div>
    </div>
  )
}
