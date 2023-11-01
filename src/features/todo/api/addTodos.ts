import { Todo } from "./types/index";

export const addTodos = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(process.env.TODO_INDEX || "", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  return data;
}
