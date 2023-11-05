import { Todo } from "./types/index";

type Props = {
  todo: Todo;
  userId: string;
}

export const addTodo = async (props: Props): Promise<Todo> => {
  const { todo, userId } = props;
  const newTodo = {
    ...todo,
    user_id: userId,
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
