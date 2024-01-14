import { Todo } from '../types';

type TodoZoneProps = {
  zone: number;
  todos: Todo[];
};

export const TodoZone = ({ zone, todos }: TodoZoneProps) => (
  <div className={`group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-96 h-72 border-l ${zone > 1 ? 'divide-y divide-gray-200' : ''}`}>
    <div className='mt-1'>
      <h3 className='text-base font-semibold leading-6 text-gray-900'>
        <span className='absolute inset-0' aria-hidden='true' />
        {zone === 2 ? (
          <span className='bg-blue-200 rounded-lg p-1'>第{zone}の領域</span>
        ) : (
          <span>第{zone}の領域</span>
        )}
      </h3>
      <ul className='mt-2 list-none'>
        {todos
          .filter((todo) => todo.zone === zone)
          .map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
      </ul>
    </div>
  </div>
);
