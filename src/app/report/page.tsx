import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { Report } from '@/features/report/components/Report'
import { nextAuthOptions } from '@/libs/next-auth/options'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)

  if (!session) {
    redirect('/')
  }
  return <Report />
}
