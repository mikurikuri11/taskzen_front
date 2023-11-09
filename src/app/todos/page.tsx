import { redirect } from 'next/navigation'
import { TodoManagement } from '@/components/base/TodoManagement'

import { SessionInfo, useGetServerSession } from '@/hooks/useGetServerSession'

export default async function Home() {
  const sessionInfo: SessionInfo | null = await useGetServerSession()

  if (!sessionInfo) {
    redirect('/')
    return null
  }
  return <TodoManagement />
}
