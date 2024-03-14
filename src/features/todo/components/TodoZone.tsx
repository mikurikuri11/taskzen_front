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
      className={`rounded-md border border-solid border-slate-500 overflow-y-auto overflow-x-hidden group relative p-6 w-96 h-72
      ${zone === 2 ? 'bg-amber-100' : 'bg-white'}
      `}
    >
      <div>
        <h3 className='text-base font-semibold leading-6 text-gray-900'>
          <span>第{zone}の領域</span>
        </h3>
        <div
          className='
            flex
            flex-col
            gap-2
            '
        >
          {filterTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} openModalWithId={openModalWithId} />
          ))}
        </div>
      </div>
    </div>
  )
}
