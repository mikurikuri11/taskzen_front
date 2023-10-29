import { Todo } from "./types/index";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(process.env.TODO_INDEX || "", {
    cache: "no-store"
  });
  const data = await response.json();
  return data;
}
