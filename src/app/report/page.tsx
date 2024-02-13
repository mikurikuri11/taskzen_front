import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getAchievement } from '@/features/report/api/getAchievement'
import { Report } from '@/features/report/components/Report'
import { nextAuthOptions } from '@/libs/next-auth/options'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user.id

  const achievement = await getAchievement({ id: userId })
  const achievementRate = achievement[0].achievement_rate

  if (!session) {
    redirect('/')
  }
  return <Report achievementRate={achievementRate} />
}
