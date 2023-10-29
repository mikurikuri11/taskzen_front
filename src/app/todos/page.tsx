import { getTodos } from "@/features/todo/api/getTodos"

export default async function Home() {
  const todos = await getTodos();
  console.log(todos);

  // TODO: 日付のフォーマットを整えたいが、うまくいかない
  const getFormattedDate = (dateStr: string) => {
    // 日付文字列が無効な場合は "無効な日付です" を返す
    if (!dateStr) {
      return "無効な日付です";
    }

    const date = new Date(dateStr);

    // 日付が有効な場合のみフォーマットして返す
    if (!isNaN(date.getTime())) {
      // 日付を指定のフォーマットに変換する例
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('ja-JP');
    } else {
      return "無効な日付です";
    }
  }

  return (
    <>
      <ul role="list" className="divide-y divide-white/5 mx-auto max-w-screen-md mt-6">
        {todos.map((todo) => (
          <li key={todo.title} className="py-4">
            <div className="flex todos-center gap-x-3">
              <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">{todo.title}</h3>
              <time className="flex-none text-xs text-gray-500">
                日付：{getFormattedDate(todo.dueDate)}
              </time>
            </div>
            <p className="mt-3 truncate text-sm text-gray-500">
              {todo.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
