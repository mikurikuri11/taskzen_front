import { SimpleGrid } from '@mantine/core'
import { memo } from 'react'

import { TodoZone } from './TodoZone'
import { Id, Todo } from '@/types'

interface Props {
  todos: Todo[]
  openModalWithId: (id: Id) => void
}

export const TodoMatrix = memo((props: Props) => {
  const { todos, openModalWithId } = props

  if (!todos) {
    return null
  }

  if (todos.length === 0) {
    return null
  }

  const todosByOne = todos.filter((todo) => todo.zone === 1)
  const todosByTwo = todos.filter((todo) => todo.zone === 2)
  const todosByThree = todos.filter((todo) => todo.zone === 3)
  const todosByFour = todos.filter((todo) => todo.zone === 4)

  return (
    <SimpleGrid cols={2} spacing='none' verticalSpacing='xs'>
      <TodoZone key={1} zone={1} filterTodos={todosByOne} openModalWithId={openModalWithId} />
      <TodoZone key={2} zone={2} filterTodos={todosByTwo} openModalWithId={openModalWithId} />
      <TodoZone key={3} zone={3} filterTodos={todosByThree} openModalWithId={openModalWithId} />
      <TodoZone key={4} zone={4} filterTodos={todosByFour} openModalWithId={openModalWithId} />
    </SimpleGrid>
  )
})

TodoMatrix.displayName = 'TodoMatrix'
