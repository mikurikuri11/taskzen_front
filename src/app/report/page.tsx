import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { Report } from '@/features/report/components/Report'
import { getTodos } from '@/features/todo/api/getTodo'
import { nextAuthOptions } from '@/libs/next-auth/options'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }

  const allTodos = await getTodos({ id: session.user.id })

  return <Report allTodos={allTodos} />
}
