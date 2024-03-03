import { SimpleGrid } from '@mantine/core'
import { memo } from 'react'

import { TodoZone } from './TodoZone'
import { Id, Todo } from '@/types'

interface Props {
  todos: Todo[]
  openEditModal: (id: Id) => void
}

export const TodoMatrix = memo((props: Props) => {
  const { todos, openEditModal } = props

  return (
    <SimpleGrid cols={2} spacing='none' verticalSpacing='xs'>
      {[1, 2, 3, 4].map((zone) => (
        <TodoZone
          key={zone}
          zone={zone}
          filterTodos={todos.filter((todo) => todo.zone === zone)}
          openEditModal={openEditModal}
        />
      ))}
    </SimpleGrid>
  )
})

TodoMatrix.displayName = 'TodoMatrix'
