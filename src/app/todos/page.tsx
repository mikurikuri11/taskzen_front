import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { TodoManagement } from '@/features/todo/components/TodoManagement'
import { nextAuthOptions } from '@/libs/next-auth/options'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }
  return (
    <div className='mt-16 mb-20 flex justify-center'>
      <TodoManagement />
    </div>
  )
}
