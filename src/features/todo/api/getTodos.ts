import { Todo } from "./types/index";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;;
}
