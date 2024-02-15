import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getIncompleteTodos } from '@/features/todo/api/getIncompleteTodos'
import { TodoManagement } from '@/features/todo/components/TodoManagement'
import { nextAuthOptions } from '@/libs/next-auth/options'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user.id

  if (!userId) {
    redirect('/')
  }
  const incompleteTodos = await getIncompleteTodos({ id: userId })

  if (!session) {
    redirect('/')
  }
  return <TodoManagement incompleteTodos={incompleteTodos} />
}
