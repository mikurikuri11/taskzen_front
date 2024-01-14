import { Todo } from '../types'

interface Props {
  todo: Todo
}

export const TodoCard = (props: Props) => {
  const { todo } = props

  return (
    <li
      className='
      hover:bg-slate-200
      cursor-grab
      bg-slate-300
      w-48
      rounded-md
      p-2
      text-center
      '
    >
      {todo.title}
    </li>
  )
}
