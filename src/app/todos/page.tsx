import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { TodoManagement } from '@/features/todo/components/TodoManagement'
import { nextAuthOptions } from '@/libs/next-auth/options'


export default async function Home() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }
  return <TodoManagement />
}
