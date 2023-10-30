import { TodoList } from "@/features/todo/components/TodoList";

export default async function Home() {

  return (
    <>
      <h1 className="text-3xl text-center mt-6 text-white">Todo List</h1>
      <TodoList />
    </>
  )
}
