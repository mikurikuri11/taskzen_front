import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getTodos } from '@/features/todo/api/getTodos';
import { TodoAtom } from '@/recoil/atoms/todoAtom';

// ユーザーごとのtodosを取得して、todosというグローバルstateに設定するカスタムフック
export const useSetTodos = () => {
  const [todos, setTodos] = useRecoilState(TodoAtom);
  const { data: session, status } = useSession();

  useEffect(() => {
    const getTodosAsync = async () => {
      if (status === 'authenticated' && session) {
        const todosData = await getTodos({ id: session.user.id });
        setTodos(todosData);
      }
    };

    getTodosAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);

  return todos;
};