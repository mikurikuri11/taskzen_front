import { redirect } from 'next/navigation'
import { Report } from '@/components/base/Report'

import { SessionInfo, useGetServerSession } from '@/hooks/useGetServerSession'

export default async function Home() {
  const sessionInfo: SessionInfo | null = await useGetServerSession()

  if (!sessionInfo) {
    redirect('/')
    return null
  }
  return <Report />
}
