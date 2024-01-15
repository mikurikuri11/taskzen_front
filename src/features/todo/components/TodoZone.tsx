import { DndContext } from '@dnd-kit/core'
import type { DragStartEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useMemo } from 'react'

import { Todo } from '../types'
import { TodoCard } from './TodoCard'

type TodoZoneProps = {
  zone: number
  filterTodos: Todo[]
}

export const TodoZone = ({ zone, filterTodos }: TodoZoneProps) => {
  const todosId = useMemo(() => filterTodos.map((todo) => todo.id), [filterTodos])

  const onDragStart = (event: DragStartEvent) => {
    console.log('event', event)
  }

  return (
    <div
      className={`overflow-y-auto overflow-x-hidden group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72 border-l ${
        zone > 1 ? 'divide-y divide-gray-200' : ''
      }`}
    >
      <DndContext onDragStart={onDragStart}>
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
            <SortableContext items={todosId}>
              {filterTodos
                .filter((todo) => todo.zone === zone)
                .map((todo) => (
                  <TodoCard key={todo.id} todo={todo} />
                ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </div>
  )
}
