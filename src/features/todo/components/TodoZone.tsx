import { TodoCard } from './TodoCard'
import { Todo, Id } from '@/types'

interface Props {
  zone: number
  filterTodos: Todo[]
  openModalWithId: (id: Id) => void
}

export const TodoZone = (props: Props) => {
  const { zone, filterTodos, openModalWithId } = props

  return (
    <div
      className='rounded-md border border-solid border-slate-500 overflow-y-auto overflow-x-hidden group relative bg-white p-6 w-96 h-72
      '
    >
      <div>
        <h3 className='text-base font-semibold leading-6 text-gray-900'>
          {zone === 2 ? (
            <span className='bg-blue-200 rounded-lg p-1'>第{zone}の領域</span>
          ) : (
            <span>第{zone}の領域</span>
          )}
        </h3>
        <div
          className='
            flex
            flex-col
            gap-2
            '
        >
          {filterTodos
            .filter((todo) => todo.zone === zone)
            .map((todo) => (
              <TodoCard key={todo.id} todo={todo} openModalWithId={openModalWithId} />
            ))}
        </div>
      </div>
    </div>
  )
}
