import { memo } from 'react'

import { Id, Todo } from '../types'
import { TodoZone } from './TodoZone'

interface Props {
  todos: Todo[]
  openEditModal: (id: Id) => void
}

export const TodoMatrix = memo((props: Props) => {
  const { todos, openEditModal } = props

  return (
    <div
      className='
      mt-4
      divide-y
      divide-gray-200
      overflow-hidden
      rounded-lg
      bg-gray-200
      shadow
      sm:grid
      sm:grid-cols-2
      sm:gap-px
      sm:divide-y-0
      '
    >
      {[1, 2, 3, 4].map((zone) => (
        <TodoZone
          key={zone}
          zone={zone}
          filterTodos={todos.filter((todo) => todo.zone === zone)}
          openEditModal={openEditModal}
        />
      ))}
    </div>
  )
})

TodoMatrix.displayName = 'TodoMatrix'
