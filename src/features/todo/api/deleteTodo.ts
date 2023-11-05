import { Todo } from "./types/index";

type Props = {
  id: number;
}

export const deleteTodo = async (props: Props): Promise<Todo> => {
  const { id } = props;
  console.log("id" + id);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
