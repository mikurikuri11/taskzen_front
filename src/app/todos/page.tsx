import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getIncompleteTodos } from '@/features/todo/api/getIncompleteTodos'
import { TodoManagement } from '@/features/todo/components/TodoManagement'
import { nextAuthOptions } from '@/libs/next-auth/options'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  const todos = await getIncompleteTodos({ id: session.user.id })

  return (
    <div className='mt-16 mb-20 flex justify-center'>
      <TodoManagement todos={todos} />
    </div>
  )
}
