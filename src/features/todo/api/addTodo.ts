import { Todo } from "./types/index";

type Props = {
  todo: Todo;
  id: string;
}

export const addTodo = async (props: Props): Promise<Todo> => {
  const { todo, id } = props;
  const newTodo = {
    ...todo,
    uid: id,
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos`, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
