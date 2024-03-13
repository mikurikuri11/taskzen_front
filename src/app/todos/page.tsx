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
    <div className='flex flex-col items-center justify-center mx-auto h-screen max-w-screen-md max-h-screen'>
      <TodoManagement />
    </div>
  )
}
