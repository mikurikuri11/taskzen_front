import { TodoManagement } from '@/components/base/TodoManagement'

import { getTodos } from '@/features/todo/api/getTodos'
import { SessionInfo, useGetServerSession } from '@/hooks/useGetServerSession'

export default async function Home() {
  const sessionInfo: SessionInfo | null = await useGetServerSession()
  const todos = await getTodos();

  return <>{sessionInfo ? <TodoManagement todos={todos} /> : <div>アクセスできません</div>}</>
}
