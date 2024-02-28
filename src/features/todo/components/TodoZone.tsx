import { DndContext, DragOverlay } from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'

import { useSession } from 'next-auth/react'
import { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useRecoilState } from 'recoil'

import { TodoCard } from './TodoCard'
import { deleteTodo } from '@/features/todo/api/deleteTodo'
import { getIncompleteTodos } from '@/features/todo/api/getIncompleteTodos'
import { IncompletedTodoAtom } from '@/recoil/atoms/incompletedTodoAtom'
import { Todo, Id } from '@/types'

interface Props {
  zone: number
  filterTodos: Todo[]
  openEditModal: (id: Id) => void
}

export const TodoZone = (props: Props) => {
  const { zone, filterTodos, openEditModal } = props

  const { data: session, status } = useSession()

  // const todosId = useMemo(() => filterTodos.map((todo) => todo.id), [filterTodos])

  // const [activeTodo, setActiveTodo] = useState<Todo | null>(null)

  // const [incopleteTodos, setIncompletedTodos] = useRecoilState(IncompletedTodoAtom)

  // const onDragStart = (event: DragStartEvent) => {
  //   if (event.active.data.current?.type === 'Todo') {
  //     setActiveTodo(event.active.data.current.todo)
  //     return
  //   }
  // }

  // const onDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event

  //   if (!over || active.id === over.id) {
  //     return
  //   }

  //   const activeTaskId = active.id
  //   const overTaskId = over.id

  //   setIncompletedTodos((filterTodos) => {
  //     const activeTodoIndex = filterTodos?.findIndex((todo) => todo.id === activeTaskId)
  //     const overTodoIndex = filterTodos?.findIndex((todo) => todo.id === overTaskId)

  //     return arrayMove(filterTodos, activeTodoIndex, overTodoIndex)
  //   })
  // }

  return (
    <div
      className={`overflow-y-auto overflow-x-hidden group relative bg-white p-6 w-96 h-72 border-l ${
        zone > 1 ? 'divide-y divide-gray-200' : ''
      }`}
    >
      {/* <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}> */}
      <div className='mt-1'>
        <h3 className='text-base font-semibold leading-6 text-gray-900'>
          {zone === 2 ? (
            <span className='bg-blue-200 rounded-lg p-1'>第{zone}の領域</span>
          ) : (
            <span>第{zone}の領域</span>
          )}
        </h3>
        <div
          className='
            mt-3
            list-none
            flex
            flex-col
            gap-3
            '
        >
          {/* <SortableContext items={todosId}> */}
          {filterTodos
            .filter((todo) => todo.zone === zone)
            .map((todo) => (
              <TodoCard key={todo.id} todo={todo} openEditModal={openEditModal} />
            ))}
          {/* </SortableContext> */}
        </div>
      </div>
      {/* {createPortal( */}
      {/* <DragOverlay>
        {activeTodo && <TodoCard todo={activeTodo} openEditModal={openEditModal} />}
      </DragOverlay> */}
      {/* ,document.body
        )} */}
      {/* </DndContext> */}
    </div>
  )
}
