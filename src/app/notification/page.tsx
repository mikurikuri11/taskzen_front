import Image from 'next/image'
import { redirect } from 'next/navigation'
import { NotificationForm } from '@/components/base/NotificationForm'

import { SessionInfo, useGetServerSession } from '@/hooks/useGetServerSession'

export default async function Home() {
  const sessionInfo: SessionInfo | null = await useGetServerSession()

  if (!sessionInfo) {
    redirect('/')
    return null
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-7'>
      <NotificationForm />

      <div>
        <div className='text-xl font-semibold text-white mt-8 mb-5'>LINE友達追加☟</div>
      </div>

      <div>
        <Image src='/line-bot.png' width={200} height={200} alt={''} />
      </div>
    </div>
  )
}
