import { redirect } from 'next/navigation'

import { AchievementManagement } from '@/features/chart/components/AchievementManagement'
import { SessionInfo, useGetServerSession } from '@/hooks/useGetServerSession'

export default async function Home() {
  const sessionInfo: SessionInfo | null = await useGetServerSession()

  if (!sessionInfo) {
    redirect('/')
  }
  return <AchievementManagement />
}
