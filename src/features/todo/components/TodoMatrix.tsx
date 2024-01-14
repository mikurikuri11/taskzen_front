import { memo } from 'react';

import { Todo } from '../types';
import { TodoZone } from './TodoZone';

type Props = {
  todos: Todo[];
};

export const TodoMatrix = memo((props: Props) => {
  const { todos } = props;

  return (
    <div className='mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0'>
      {[1, 2, 3, 4].map((zone) => (
        <TodoZone key={zone} zone={zone} todos={todos} />
      ))}
    </div>
  );
});

TodoMatrix.displayName = 'TodoMatrix';