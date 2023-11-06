import { Fragment, useState, FC } from 'react'

import { editTodo } from '../api/editTodo';
import { TodoCardProps } from "./types";

export const TodoCard: FC<TodoCardProps> = (props) => {
  const { todo, id, openModal } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = async () => {
    setIsChecked(!isChecked);

    try {
      const updatedTodoData = {
        ...todo,
        completed: !isChecked,
      };

      const updatedTodo = await editTodo({ updatedTodo: updatedTodoData, id });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  console.log('isChecked', isChecked);

  return (
    <li>
      <div className="group relative flex items-center px-5 py-6">
        <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
        <div className="relative flex min-w-0 flex-1 items-center">
          <span className="relative inline-block flex-shrink-0">
            <input
              type="checkbox"
              id="area"
              name="area"
              autoComplete="area"
              className="mt-2 h-5 w-5 rounded border-0 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
              checked={isChecked}
              onClick={handleCheckboxClick}
            />
          </span>
          <div className="ml-4 truncate">
            <p
              className="cursor-pointer truncate text-sm font-medium text-gray-900"
              onClick={() => openModal(id)}
            >
              {todo.title}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
