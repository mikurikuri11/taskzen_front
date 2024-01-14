import { Todo } from '../types'
import { TodoCard } from './TodoCard'

type TodoZoneProps = {
  zone: number
  todos: Todo[]
}

export const TodoZone = ({ zone, todos }: TodoZoneProps) => (
  <div
    className={`overflow-y-auto overflow-x-hidden group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72 border-l ${
      zone > 1 ? 'divide-y divide-gray-200' : ''
    }`}
  >
    <div className='mt-1'>
      <h3 className='text-base font-semibold leading-6 text-gray-900'>
        {zone === 2 ? (
          <span className='bg-blue-200 rounded-lg p-1'>第{zone}の領域</span>
        ) : (
          <span>第{zone}の領域</span>
        )}
      </h3>
      <ul
        className='
        mt-3
        list-none
        flex
        flex-col
        gap-3
        '
      >
        {todos
          .filter((todo) => todo.zone === zone)
          .map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
      </ul>
    </div>
  </div>
)
