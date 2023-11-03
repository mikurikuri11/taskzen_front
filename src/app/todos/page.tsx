import { TodoManagement } from '@/components/base/TodoManagement'
import { SessionInfo, useGetServerSession } from '@/hooks/useGetServerSession'

export default async function Home() {
  const sessionInfo: SessionInfo | null = await useGetServerSession()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/todos`, { cache: 'no-store' })
  const todos = await res.json()
  console.log('todos', todos)

  return <>{sessionInfo ? <TodoManagement todos={todos} /> : <div>アクセスできません</div>}</>
}
