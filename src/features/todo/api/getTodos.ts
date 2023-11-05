import { Todo } from "./types/index";

type Props = {
  id: string;
}

export const getTodos = async (props: Props): Promise<Todo[]> => {
  const { id } = props;
  console.log("id" + id);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/todos_by_user/${id}`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;
}
