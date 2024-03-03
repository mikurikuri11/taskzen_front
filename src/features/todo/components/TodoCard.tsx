import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

import { Id, Todo } from '@/types'

interface Props {
  todo: Todo
  openModal: (id: Id) => void
}

export const TodoCard = (props: Props) => {
  const { todo, openModal } = props

  const [mouseIsOver, setMouseIsOver] = useState(false)

  return (
    <div
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
          <FaEdit onClick={() => openModal(todo.id)} className='cursor-pointer mr-1' />
        )}
      </p>
    </div>
  )
}
